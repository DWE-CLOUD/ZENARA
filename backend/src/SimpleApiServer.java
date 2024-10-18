import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class SimpleApiServer {

    private static final String UPLOAD_DIR = "uploads";
    private static final String OPEN_LIBRARY_API_URL = "https://openlibrary.org/search.json";


    public static void main(String[] args) throws IOException {
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new CORSHandler(new MyHandler()));
        server.createContext("/upload", new CORSHandler(new UploadHandler()));
        server.createContext("/system-check", new CORSHandler(new SystemCheckHandler()));
        server.createContext("/login", new CORSHandler(new LoginHandler()));
        server.createContext("/book-search", new CORSHandler(new BookSearchHandler()));
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on port 8080");
    }

    static class CORSHandler implements HttpHandler {
        private final HttpHandler handler;

        public CORSHandler(HttpHandler handler) {
            this.handler = handler;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");

            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            handler.handle(exchange);
        }
    }

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "Welcome to the Zenara API server!";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    static class UploadHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            if (t.getRequestMethod().equalsIgnoreCase("POST")) {
                try {
                    InputStream is = t.getRequestBody();
                    String filename = getFileNameFromHeaders(t);
                    if (filename == null || filename.isEmpty()) {
                        filename = "uploaded_file";
                    }
                    FileOutputStream fos = new FileOutputStream(UPLOAD_DIR + "/" + filename);
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = is.read(buffer)) != -1) {
                        fos.write(buffer, 0, len);
                    }
                    fos.close();
                    is.close();
                    String response = "File uploaded successfully!";
                    t.sendResponseHeaders(200, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    String response = "Error uploading file.";
                    t.sendResponseHeaders(500, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                }
            } else {
                String response = "Only POST requests are allowed for file uploads.";
                t.sendResponseHeaders(405, response.length());
                OutputStream os = t.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }

        private String getFileNameFromHeaders(HttpExchange t) {
            return null;
        }
    }

    static class SystemCheckHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "{\n" +
                    "  \"status\": \"OK\",\n" +
                    "  \"JAVA \": OK,\n" +
                    "  \"Zenara Book System\": ON,\n" +
                    "  \"OpenCv Gradle\": OFF\n" +
                    "}";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            if (t.getRequestMethod().equalsIgnoreCase("POST")) {
                Map<String, String> params = parseFormData(t);
                String username = params.get("username");
                String password = params.get("password");
                if (username != null && password != null && authenticate(username, password)) {
                    String response = "Login successful!";
                    t.getResponseHeaders().add("Content-Type", "text/plain");
                    t.sendResponseHeaders(200, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                } else {
                    String response = "Invalid username or password.";
                    t.getResponseHeaders().add("Content-Type", "text/plain");
                    t.sendResponseHeaders(401, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                }
            } else {
                String response = "Only POST requests are allowed for login.";
                t.getResponseHeaders().add("Content-Type", "text/plain");
                t.sendResponseHeaders(405, response.length());
                OutputStream os = t.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }

        private boolean authenticate(String username, String password) {
            return username.equals("admin") && password.equals("password");
        }

        private Map<String, String> parseFormData(HttpExchange t) throws IOException {
            Map<String, String> result = new HashMap<>();
            String formData = new String(t.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            String[] pairs = formData.split("&");
            for (String pair : pairs) {
                String[] parts = pair.split("=");
                if (parts.length == 2) {
                    String key = URLDecoder.decode(parts[0], StandardCharsets.UTF_8.toString());
                    String value = URLDecoder.decode(parts[1], StandardCharsets.UTF_8.toString());
                    result.put(key, value);
                }
            }
            return result;
        }
    }

    static class BookSearchHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            if (t.getRequestMethod().equalsIgnoreCase("GET")) {
                String query = getQueryParam(t, "q");
                if (query != null && !query.isEmpty()) {
                    try {
                        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8.toString());
                        String apiUrl = OPEN_LIBRARY_API_URL + "?q=" + encodedQuery;
                        URL url = new URL(apiUrl);
                        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                        connection.setRequestMethod("GET");
                        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        StringBuilder responseBuilder = new StringBuilder();
                        String line;
                        while ((line = reader.readLine()) != null) {
                            responseBuilder.append(line);
                        }
                        reader.close();
                        Gson gson = new Gson();
                        JsonObject jsonResponse = gson.fromJson(responseBuilder.toString(), JsonObject.class);
                        JsonArray docs = jsonResponse.getAsJsonArray("docs");
                        StringBuilder bookResults = new StringBuilder();
                        for (JsonElement doc : docs) {
                            JsonObject book = doc.getAsJsonObject();
                            String title = book.get("title").getAsString();
                            bookResults.append("Title: ").append(title).append("\n");
                            bookResults.append("\n");
                        }

                        String response = bookResults.toString();
                        byte[] responseBytes = response.getBytes();

                        t.sendResponseHeaders(200, responseBytes.length);

                        OutputStream os = t.getResponseBody();
                        os.write(responseBytes);
                        os.close();

                    } catch (IOException e) {
                        e.printStackTrace();
                        String response = "Error fetching book data.";
                        t.sendResponseHeaders(500, response.length());
                        OutputStream os = t.getResponseBody();
                        os.write(response.getBytes());
                        os.close();
                    }
                } else {
                    String response = "Please provide a search query (e.g., /book-search?q=java).";
                    t.sendResponseHeaders(400, response.length());
                    OutputStream os = t.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                }
            } else {
                String response = "Only GET requests are allowed for book search.";
                t.sendResponseHeaders(405, response.length());
                OutputStream os = t.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }

        private String getQueryParam(HttpExchange t, String paramName) {
            String query = t.getRequestURI().getQuery();
            if (query != null) {
                String[] pairs = query.split("&");
                for (String pair : pairs) {
                    String[] parts = pair.split("=");
                    if (parts.length == 2 && parts[0].equals(paramName)) {
                        return parts[1];
                    }
                }
            }
            return null;
        }
    }
}
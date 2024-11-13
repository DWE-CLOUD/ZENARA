import React, { useState, useEffect } from 'react';

const ParentsCorner = () => {
    const [activeTab, setActiveTab] = useState('warning-signs');
    const [expandedFaqs, setExpandedFaqs] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTip, setActiveTip] = useState(0);

    const safetyTips = [
        "Create a family safety word that only trusted people know",
        "Regularly check-in with your children about their feelings and experiences",
        "Keep communication channels open and judgment-free",
        "Trust your instincts if something doesn't feel right",
        "Stay involved in your child's online and offline activities"
    ];

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setActiveTip(prev => (prev + 1) % safetyTips.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const toggleFaq = (id) => {
        setExpandedFaqs(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className={`max-w-6xl mx-auto p-6 bg-gradient-to-br from-white to-purple-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Floating Safety Tip */}

            {/* Header Section with Animation */}
            <div className="text-center mb-12 transform transition-all duration-1000 hover:scale-105">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
                    Parents' Corner
                </h1>
                <p className="text-gray-600 text-lg animate-pulse">
                    Empowering parents with knowledge and resources to keep children safe
                </p>
            </div>

            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg mb-8 transform transition-transform hover:scale-102 animate-bounce">
                <h2 className="text-xl font-bold mb-2">Need Immediate Help?</h2>
                <p className="text-lg">Call Emergency Services: 100</p>
                <p className="text-lg">Child Abuse Hotline: 1098</p>
            </div>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                    {
                        title: "24/7 Support",
                        icon: "🆘",
                        content: "Access immediate help and resources"
                    },
                    {
                        title: "Safety Guidelines",
                        icon: "🛡️",
                        content: "Learn essential safety protocols"
                    },
                    {
                        title: "Report Concerns",
                        icon: "📢",
                        content: "Know when and how to report"
                    }
                ].map((card, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                        <div className="text-4xl mb-4">{card.icon}</div>
                        <h3 className="text-xl font-bold text-purple-700 mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.content}</p>
                    </div>
                ))}
            </div>

            {/* Interactive Navigation */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {['warning-signs', 'prevention-tips', 'communication', 'resources'].map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-110 ${
                            activeTab === tab
                                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                ))}
            </div>

            {/* Main Content Section with Animation */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all duration-500">
                {/* Content sections remain the same but with enhanced styling */}
                {activeTab === 'warning-signs' && (
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-3xl font-bold text-purple-800 mb-6">Warning Signs to Watch For</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Behavioral Signs",
                                    items: [
                                        "Sudden changes in behavior",
                                        "Excessive fear of certain places",
                                        "Unexplained aggression",
                                        "Age-inappropriate behavior",
                                        "Sudden mood swings"
                                    ]
                                },
                                {
                                    title: "Physical Signs",
                                    items: [
                                        "Unexplained injuries",
                                        "Difficulty walking or sitting",
                                        "Unusual marks or bruises",
                                        "Frequent complaints of pain",
                                        "Changes in eating habits"
                                    ]
                                }
                            ].map((section, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md transform transition-all duration-500 hover:scale-105"
                                >
                                    <h3 className="text-xl font-bold text-purple-700 mb-4">{section.title}</h3>
                                    <ul className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <span className="mr-2 text-purple-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Prevention Tips Section */}
                {activeTab === 'prevention-tips' && (
                    <div className="space-y-8 animate-fadeIn">
                        <h2 className="text-3xl font-bold text-purple-800 mb-6">Prevention Strategies</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Digital Safety",
                                    icon: "💻",
                                    items: [
                                        "Monitor online activities",
                                        "Set parental controls",
                                        "Discuss online privacy",
                                        "Know their online friends",
                                        "Regular safety check-ins"
                                    ]
                                },
                                {
                                    title: "Physical Safety",
                                    icon: "🛡️",
                                    items: [
                                        "Teach body boundaries",
                                        "Identify safe adults",
                                        "Practice safety scenarios",
                                        "Encourage open communication",
                                        "Trust their instincts"
                                    ]
                                }
                            ].map((section, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md transform transition-all duration-500 hover:scale-105"
                                >
                                    <div className="text-4xl mb-4">{section.icon}</div>
                                    <h3 className="text-xl font-bold text-purple-700 mb-4">{section.title}</h3>
                                    <ul className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <span className="mr-2 text-purple-500">→</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resources Section */}
                {activeTab === 'resources' && (
                    <div className="space-y-8 animate-fadeIn">
                        <h2 className="text-3xl font-bold text-purple-800 mb-6">Helpful Resources</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Educational Materials",
                                    icon: "📚",
                                    items: ["Safety workbooks", "Interactive games", "Learning videos"]
                                },
                                {
                                    title: "Support Services",
                                    icon: "🤝",
                                    items: ["Counseling", "Support groups", "Crisis hotlines"]
                                },
                                {
                                    title: "Safety Tools",
                                    icon: "🔧",
                                    items: ["Safety planners", "Checklists", "Guidelines"]
                                }
                            ].map((resource, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
                                >
                                    <div className="text-4xl mb-4">{resource.icon}</div>
                                    <h3 className="text-xl font-bold text-purple-700 mb-4">{resource.title}</h3>
                                    <ul className="space-y-2">
                                        {resource.items.map((item, i) => (
                                            <li key={i} className="text-gray-600">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Interactive FAQ Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-purple-800 mb-6">Common Questions</h2>
                <div className="space-y-4">
                    {[
                        {
                            id: 1,
                            question: "How do I start conversations about safety?",
                            answer: "Begin with age-appropriate discussions, use everyday moments as teaching opportunities, and maintain an open, supportive environment."
                        },
                        {
                            id: 2,
                            question: "What are the signs of online grooming?",
                            answer: "Watch for secretive online behavior, unexpected gifts, emotional manipulation, and attempts to isolate children from family and friends."
                        },
                        {
                            id: 3,
                            question: "How can I build trust with my child?",
                            answer: "Create regular one-on-one time, listen without judgment, respect their feelings, and follow through on your promises."
                        }
                    ].map(faq => (
                        <div
                            key={faq.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
                        >
                            <button
                                className="w-full p-4 text-left font-bold text-purple-800 hover:bg-purple-50 focus:outline-none flex justify-between items-center"
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <span>{faq.question}</span>
                                <span className="text-2xl transform transition-transform duration-300">
                  {expandedFaqs.includes(faq.id) ? '−' : '+'}
                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ${
                                    expandedFaqs.includes(faq.id)
                                        ? 'max-h-48 opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <p className="p-4 text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Call-to-Action */}
            <div className="text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
                <h2 className="text-2xl font-bold mb-4">Stay Informed, Stay Connected</h2>
                <p className="mb-6">Join our community of caring parents and get regular updates on child safety.</p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-110">
                    Subscribe to Updates
                </button>
            </div>
        </div>
    );
};

export default ParentsCorner;
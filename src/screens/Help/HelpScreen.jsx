import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Tabs, 
  Tab, 
  Grid,
  Chip,
  Button
} from '@mui/material';
import { 
  ChevronDown, 
  BarChart2, 
  DollarSign, 
  Receipt, 
  TrendingUp, 
  Brain, 
  FileText,
  PlayCircle,
  BookOpen,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const pageGuides = [
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    icon: BarChart2,
    color: '#3d7ae5',
    description: 'Your financial command center with real-time insights',
    features: [
      'Real-time financial metrics (Revenue, Costs, Expenses, Net Profit)',
      'Interactive charts showing financial performance trends',
      'Quick overview of your business financial health',
      'Visual representation of income vs expenses'
    ],
    howToUse: [
      'View your total revenue, costs, and expenses at a glance',
      'Monitor net profit to understand overall business performance',
      'Use the chart to identify trends and patterns in your finances',
      'Check the dashboard daily for quick financial health checks'
    ],
    tips: [
      'Green numbers indicate positive performance',
      'Red numbers show areas that need attention',
      'The chart updates automatically as you add new data'
    ]
  },
  {
    id: 'ledger',
    title: 'Finance Ledger',
    icon: DollarSign,
    color: '#45b020',
    description: 'Track all your revenue and cost transactions',
    features: [
      'Add revenue and cost entries with detailed information',
      'Categorize transactions for better organization',
      'Edit and delete entries as needed',
      'Sort and filter transactions by date and type'
    ],
    howToUse: [
      'Click "Add Entry" to record new revenue or costs',
      'Fill in date, description, category, type, and amount',
      'Use categories to organize similar transactions',
      'Review and edit entries using the action buttons'
    ],
    tips: [
      'Be consistent with category naming for better reporting',
      'Add entries regularly to maintain accurate records',
      'Use descriptive names to easily identify transactions later'
    ]
  },
  {
    id: 'expenses',
    title: 'Expense Manager',
    icon: Receipt,
    color: '#f5640d',
    description: 'Comprehensive expense tracking with smart categorization',
    features: [
      'Track expenses across 4 main categories: Subscriptions, Travel, Meals, Office',
      'Set up recurring expenses for automatic tracking',
      'Store receipt URLs for documentation',
      'View expense summaries by category'
    ],
    howToUse: [
      'Select the appropriate category tab or use "All Expenses"',
      'Click "Add Expense" to record new expenses',
      'Mark expenses as recurring if they repeat regularly',
      'Add receipt URLs for better record keeping'
    ],
    tips: [
      'Use subcategories for more detailed expense tracking',
      'Set up recurring expenses to avoid manual entry',
      'Store digital receipts using cloud storage links'
    ]
  },
  {
    id: 'forecast',
    title: 'AI-Powered Forecasting',
    icon: TrendingUp,
    color: '#1092ef',
    description: 'Predict future financial performance with AI insights',
    features: [
      'AI-generated revenue and expense projections',
      'Budget health assessment with risk analysis',
      'Cash flow projections for 12 months',
      'Traditional forecasting models for comparison'
    ],
    howToUse: [
      'Review AI budget health assessment at the top',
      'Check incoming revenue and expense projections',
      'Analyze the 12-month cash flow chart',
      'Use traditional models for manual forecasting'
    ],
    tips: [
      'Pay attention to AI recommendations for budget optimization',
      'Monitor cash flow gaps and plan accordingly',
      'Use confidence scores to assess projection reliability'
    ]
  },
  {
    id: 'ai-analysis',
    title: 'AI Financial Analysis',
    icon: Brain,
    color: '#9513fb',
    description: 'Advanced AI-powered financial insights and recommendations',
    features: [
      'Financial health score out of 100',
      'Automated income statement and balance sheet generation',
      'Industry benchmarking and comparisons',
      'AI-powered profit optimization recommendations'
    ],
    howToUse: [
      'Start with the Overview tab to see your financial health score',
      'Review the Income Statement for detailed P&L analysis',
      'Check the Balance Sheet for asset and liability breakdown',
      'Implement recommendations from the Optimization Tips tab'
    ],
    tips: [
      'Higher health scores indicate better financial performance',
      'Compare your metrics with industry averages',
      'Prioritize high-impact optimization recommendations'
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation Center',
    icon: FileText,
    color: '#d22cd6',
    description: 'Store and manage financial documents and notes',
    features: [
      'Create and edit financial documents',
      'Store important notes and procedures',
      'Track document update history',
      'Search and organize documents'
    ],
    howToUse: [
      'Use the form on the left to create new documents',
      'Add a descriptive title and detailed content',
      'Save documents for future reference',
      'Edit existing documents by clicking the edit icon'
    ],
    tips: [
      'Use clear, descriptive titles for easy searching',
      'Include dates and context in your documentation',
      'Regular documentation helps with compliance and audits'
    ]
  },
  {
    id: 'moneyiq',
    title: 'HitFinance MoneyIQ AI Chat',
    icon: Brain,
    color: '#9513fb',
    description: 'Your personal AI financial advisor for real-time guidance',
    features: [
      'Real-time AI chat with financial context awareness',
      'Personalized advice based on your actual financial data',
      'Profit optimization recommendations and strategies',
      'Industry benchmarking and performance comparisons',
      'Quick suggestion prompts for common financial questions'
    ],
    howToUse: [
      'Click the brain icon (floating button) on the Dashboard to open MoneyIQ',
      'Ask questions about your finances, expenses, or revenue',
      'Use quick suggestion chips for common topics',
      'Minimize the chat to keep it accessible while working'
    ],
    tips: [
      'MoneyIQ knows your current financial data - ask specific questions',
      'Try asking "How can I reduce my expenses?" for targeted advice',
      'Use it for quick financial health checks and optimization ideas'
    ]
  }
];

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I get started with HitFinance?',
        answer: 'Simply sign in with your Google account and start by adding your first revenue or expense entry. The dashboard will automatically update to show your financial overview.'
      },
      {
        question: 'Is my financial data secure?',
        answer: 'Yes, HitFinance uses Google Firebase for secure authentication and data storage. Your data is encrypted and only accessible to you through your Google account.'
      },
      {
        question: 'Can I import data from other financial software?',
        answer: 'Currently, HitFinance requires manual data entry. However, you can easily add historical data by entering past transactions in the Finance Ledger and Expense Manager.'
      }
    ]
  },
  {
    category: 'Features & Functionality',
    questions: [
      {
        question: 'What\'s the difference between the Finance Ledger and Expense Manager?',
        answer: 'The Finance Ledger tracks high-level revenue and costs related to your core business operations. The Expense Manager focuses on detailed operational expenses like subscriptions, travel, meals, and office expenses.'
      },
      {
        question: 'How accurate are the AI predictions?',
        answer: 'AI predictions are based on your historical data patterns and industry benchmarks. Accuracy improves as you add more data. Confidence scores are provided to help you assess reliability.'
      },
      {
        question: 'Can I set up recurring expenses?',
        answer: 'Yes! In the Expense Manager, you can mark expenses as recurring and set the frequency (weekly, monthly, quarterly, or yearly). This helps with automatic tracking and forecasting.'
      },
      {
        question: 'What do the different financial health scores mean?',
        answer: 'Scores are calculated based on profitability, cash flow, expense ratios, and growth trends. 80+ is excellent, 60-79 is good, 40-59 needs attention, and below 40 requires immediate action.'
      },
      {
        question: 'How do I use HitFinance MoneyIQ?',
        answer: 'MoneyIQ is your AI financial advisor available on the Dashboard. Click the brain icon to open the chat, then ask questions about your finances. It knows your current financial data and provides personalized advice to help make you more profitable.'
      },
      {
        question: 'What kind of questions can I ask MoneyIQ?',
        answer: 'You can ask about profit optimization, expense reduction, revenue growth strategies, cash flow management, tax planning, industry benchmarking, and any other financial questions. MoneyIQ provides context-aware advice based on your actual data.'
      }
    ]
  },
  {
    category: 'HitFinance MoneyIQ AI Chat',
    questions: [
      {
        question: 'How does MoneyIQ know about my financial situation?',
        answer: 'MoneyIQ has access to your current financial data including revenue, costs, expenses, profit margins, and transaction history. This allows it to provide personalized, data-driven advice specific to your business situation.'
      },
      {
        question: 'What makes MoneyIQ different from other financial chatbots?',
        answer: 'MoneyIQ is specifically designed for HitFinance users and has deep integration with your financial data. It provides contextual advice based on your actual performance, not generic financial tips. It focuses specifically on profit optimization and business growth.'
      },
      {
        question: 'Can MoneyIQ help me reduce my expenses?',
        answer: 'Absolutely! MoneyIQ analyzes your expense breakdown and identifies your highest spending categories. It can suggest specific cost reduction strategies, subscription audits, and vendor negotiations based on your actual spending patterns.'
      },
      {
        question: 'How often should I chat with MoneyIQ?',
        answer: 'Use MoneyIQ whenever you have financial questions or need quick insights. Many users find it helpful for daily financial health checks, weekly expense reviews, and monthly strategic planning sessions.'
      },
      {
        question: 'Does MoneyIQ remember our previous conversations?',
        answer: 'Yes, MoneyIQ maintains conversation history during your session to provide contextual responses. However, conversation history resets when you close and reopen the chat for privacy and performance reasons.'
      },
      {
        question: 'What if MoneyIQ gives me advice I disagree with?',
        answer: 'MoneyIQ provides suggestions based on data analysis and industry best practices, but you should always use your business judgment. The AI is a tool to help inform your decisions, not replace your expertise about your business.'
      },
      {
        question: 'Can MoneyIQ help with tax planning?',
        answer: 'Yes! MoneyIQ can identify potential tax deductions based on your expense categories, suggest business expense optimizations, and provide general tax planning strategies. However, always consult with a qualified tax professional for specific tax advice.'
      },
      {
        question: 'How does MoneyIQ compare my business to industry standards?',
        answer: 'MoneyIQ uses built-in industry benchmarks to compare your profit margins, expense ratios, and growth rates against similar businesses. It can tell you if you\'re performing above or below industry averages and suggest improvements.'
      }
    ]
  },
  {
    category: 'Data Management',
    questions: [
      {
        question: 'Can I edit or delete entries after adding them?',
        answer: 'Yes, you can edit or delete any entry in both the Finance Ledger and Expense Manager using the action buttons in each row.'
      },
      {
        question: 'How do I categorize my transactions?',
        answer: 'Use consistent category names in the Finance Ledger, and select from predefined categories in the Expense Manager. Good categorization improves reporting and AI analysis accuracy.'
      },
      {
        question: 'Can I attach receipts to expenses?',
        answer: 'You can add receipt URLs to expenses. We recommend using cloud storage services like Google Drive or Dropbox to store receipt images and paste the sharing links.'
      }
    ]
  },
  {
    category: 'Reports & Analysis',
    questions: [
      {
        question: 'How often should I check my financial reports?',
        answer: 'Check the Dashboard daily for quick insights, review AI Analysis weekly for deeper insights, and use Forecasting monthly for planning purposes.'
      },
      {
        question: 'What should I do if my financial health score is low?',
        answer: 'Review the AI recommendations in the Financial Analysis section, focus on high-priority optimization tips, and consider reducing expenses or increasing revenue streams.'
      },
      {
        question: 'How do I interpret the cash flow projections?',
        answer: 'Green bars show positive cash flow, red bars indicate negative flow. The blue line shows your running balance. Plan for periods where the balance might go negative.'
      }
    ]
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        question: 'Why isn\'t my data showing up in charts?',
        answer: 'Make sure you\'ve added entries with valid dates and amounts. Charts update automatically, but may take a moment to refresh after adding new data.'
      },
      {
        question: 'The AI analysis isn\'t generating. What should I do?',
        answer: 'AI analysis requires at least some data in your ledger or expenses. Add a few entries first, then click "Refresh AI Analysis" to generate insights.'
      },
      {
        question: 'Can I use HitFinance on mobile devices?',
        answer: 'Yes, HitFinance is responsive and works on mobile devices. However, for the best experience with charts and detailed analysis, we recommend using a desktop or tablet.'
      }
    ]
  }
];

export const HelpScreen = ({ userId }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [expandedFaq, setExpandedFaq] = React.useState(false);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const renderOverview = () => (
    <Stack spacing={4}>
      <Card sx={{ p: 4, background: "linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)" }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BookOpen size={32} color="white" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
              Welcome to HitFinance Help Center
            </Typography>
            <Typography sx={{ color: "#d2e0f5", fontSize: "16px", mb: 2 }}>
              Your comprehensive guide to mastering financial management with AI-powered insights
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label="7 Core Features"
                sx={{
                  backgroundColor: "#c1f5af",
                  color: "#45b020",
                  fontSize: "12px"
                }}
              />
              <Chip
                label="AI-Powered"
                sx={{
                  backgroundColor: "#e6ccff",
                  color: "#9513fb",
                  fontSize: "12px"
                }}
              />
              <Chip
                label="MoneyIQ Chat"
                sx={{
                  backgroundColor: "#fdbcff",
                  color: "#d22cd6",
                  fontSize: "12px"
                }}
              />
              <Chip
                label="Real-time Updates"
                sx={{
                  backgroundColor: "#a6d6f8",
                  color: "#1092ef",
                  fontSize: "12px"
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Card>

      <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
        Feature Overview
      </Typography>

      <Grid container spacing={3}>
        {pageGuides.map((guide) => {
          const IconComponent = guide.icon;
          return (
            <Grid item xs={12} md={6} key={guide.id}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      background: `${guide.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <IconComponent size={24} color={guide.color} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                      {guide.title}
                    </Typography>
                    <Typography sx={{ color: "#d2e0f5", fontSize: "12px", mb: 2 }}>
                      {guide.description}
                    </Typography>
                    <Typography sx={{ color: "#a4b4cb", fontSize: "11px" }}>
                      Key features: {guide.features.length} • Tips: {guide.tips.length}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
          Quick Start Guide
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#c1f5af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography sx={{ color: "#45b020", fontSize: "24px", fontWeight: 700 }}>1</Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Add Your Data
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Start by adding revenue and expenses in the Finance Ledger and Expense Manager
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#a6d6f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography sx={{ color: "#1092ef", fontSize: "24px", fontWeight: 700 }}>2</Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Review Insights
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Check your Dashboard and AI Analysis for automated insights and recommendations
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#e6ccff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography sx={{ color: "#9513fb", fontSize: "24px", fontWeight: 700 }}>3</Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Get AI Guidance
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center" }}>
                Chat with MoneyIQ for personalized financial advice and profit optimization tips
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* MoneyIQ Highlight Card */}
      <Card sx={{ p: 4, background: "linear-gradient(135deg, rgba(149,19,251,0.1) 0%, rgba(210,44,214,0.1) 100%)" }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #9513fb, #d22cd6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Brain size={28} color="white" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
              Meet HitFinance MoneyIQ
            </Typography>
            <Typography sx={{ color: "#d2e0f5", fontSize: "14px", mb: 2 }}>
              Your personal AI financial advisor that knows your business inside and out. Available 24/7 on your Dashboard to help optimize profitability and answer financial questions.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label="Context-Aware"
                sx={{
                  backgroundColor: "#fdbcff",
                  color: "#d22cd6",
                  fontSize: "10px"
                }}
              />
              <Chip
                label="Profit-Focused"
                sx={{
                  backgroundColor: "#c1f5af",
                  color: "#45b020",
                  fontSize: "10px"
                }}
              />
              <Chip
                label="Real-time Data"
                sx={{
                  backgroundColor: "#a6d6f8",
                  color: "#1092ef",
                  fontSize: "10px"
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );

  const renderGuides = () => (
    <Stack spacing={4}>
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        Detailed Feature Guides
      </Typography>
      
      {pageGuides.map((guide) => {
        const IconComponent = guide.icon;
        return (
          <Card key={guide.id} sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "12px",
                  background: `${guide.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <IconComponent size={28} color={guide.color} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
                  {guide.title}
                </Typography>
                <Typography sx={{ color: "#d2e0f5", fontSize: "14px" }}>
                  {guide.description}
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#4ade80", mb: 2, fontSize: "14px" }}>
                  <CheckCircle size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Key Features
                </Typography>
                <Stack spacing={1}>
                  {guide.features.map((feature, index) => (
                    <Typography key={index} sx={{ color: "#d2e0f5", fontSize: "12px" }}>
                      • {feature}
                    </Typography>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#01b8e3", mb: 2, fontSize: "14px" }}>
                  <PlayCircle size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  How to Use
                </Typography>
                <Stack spacing={1}>
                  {guide.howToUse.map((step, index) => (
                    <Typography key={index} sx={{ color: "#d2e0f5", fontSize: "12px" }}>
                      {index + 1}. {step}
                    </Typography>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#ff8c36", mb: 2, fontSize: "14px" }}>
                  <Info size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Pro Tips
                </Typography>
                <Stack spacing={1}>
                  {guide.tips.map((tip, index) => (
                    <Typography key={index} sx={{ color: "#d2e0f5", fontSize: "12px" }}>
                      💡 {tip}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </Stack>
  );

  const renderFAQ = () => (
    <Stack spacing={4}>
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        Frequently Asked Questions
      </Typography>
      
      {faqData.map((category, categoryIndex) => (
        <Card key={categoryIndex} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
            {category.category}
          </Typography>
          
          {category.questions.map((faq, faqIndex) => (
            <Accordion
              key={faqIndex}
              expanded={expandedFaq === `panel${categoryIndex}-${faqIndex}`}
              onChange={handleFaqChange(`panel${categoryIndex}-${faqIndex}`)}
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "white",
                "&:before": { display: "none" },
                mb: 1
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={20} color="white" />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0"
                  }
                }}
              >
                <Typography sx={{ color: "white", fontSize: "14px", fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#d2e0f5", fontSize: "12px", lineHeight: 1.6 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      ))}
    </Stack>
  );

  const renderSupport = () => (
    <Stack spacing={4}>
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        Support & Resources
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: "100%" }}>
            <Stack alignItems="center" spacing={3}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#a6d6f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <MessageCircle size={32} color="#1092ef" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Contact Support
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center", mb: 2 }}>
                Need help? Our support team is here to assist you with any questions or issues.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#1092ef",
                  color: "#1092ef",
                  "&:hover": {
                    borderColor: "#01b8e3",
                    color: "#01b8e3"
                  }
                }}
                endIcon={<ExternalLink size={16} />}
              >
                Contact Support
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: "100%" }}>
            <Stack alignItems="center" spacing={3}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#c1f5af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <BookOpen size={32} color="#45b020" />
              </Box>
              <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
                Documentation
              </Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px", textAlign: "center", mb: 2 }}>
                Access detailed technical documentation and API references for advanced users.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#45b020",
                  color: "#45b020",
                  "&:hover": {
                    borderColor: "#4ade80",
                    color: "#4ade80"
                  }
                }}
                endIcon={<ExternalLink size={16} />}
              >
                View Docs
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
          System Requirements & Compatibility
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: "#4ade80", mb: 2, fontSize: "14px" }}>
              Supported Browsers
            </Typography>
            <Stack spacing={1}>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Chrome 90+ (Recommended)</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Firefox 88+</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Safari 14+</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Edge 90+</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: "#01b8e3", mb: 2, fontSize: "14px" }}>
              Device Compatibility
            </Typography>
            <Stack spacing={1}>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Desktop computers (Optimal experience)</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Tablets (Good for viewing and basic editing)</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Mobile phones (Basic functionality)</Typography>
              <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>• Minimum screen resolution: 1024x768</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 4, background: "linear-gradient(135deg, rgba(255,140,54,0.1) 0%, rgba(245,100,13,0.1) 100%)" }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <AlertCircle size={24} color="#ff8c36" />
          <Typography variant="h6" sx={{ color: "#ff8c36" }}>
            Important Notes
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>
            • HitFinance requires an active internet connection for real-time data synchronization
          </Typography>
          <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>
            • Data is automatically saved to your Google account via Firebase
          </Typography>
          <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>
            • AI features require sufficient historical data for accurate predictions
          </Typography>
          <Typography sx={{ color: "#d2e0f5", fontSize: "12px" }}>
            • For best performance, keep your browser updated to the latest version
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Manrope, Helvetica",
          fontWeight: 800,
          color: "white",
          fontSize: "32px",
          mb: 4,
        }}
      >
        Help & FAQ
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: "#a4b4cb",
              fontFamily: "Sora",
              fontSize: "12px",
              textTransform: "none",
              "&.Mui-selected": {
                color: "#3d7ae5",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#3d7ae5",
            },
          }}
        >
          <Tab label="Overview" value="overview" />
          <Tab label="Feature Guides" value="guides" />
          <Tab label="FAQ" value="faq" />
          <Tab label="Support" value="support" />
        </Tabs>
      </Box>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'guides' && renderGuides()}
      {activeTab === 'faq' && renderFAQ()}
      {activeTab === 'support' && renderSupport()}
    </Box>
  );
};

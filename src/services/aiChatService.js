// AI Chat Service for HitFinance MoneyIQ
import { v4 as uuidv4 } from 'uuid';

class AIChatService {
  constructor() {
    // Mock mode for demo - in production, integrate with OpenAI GPT-4 or similar
    this.mockMode = true;
    this.conversationHistory = [];
  }

  async sendMessage(message, userContext, financialData) {
    if (this.mockMode) {
      return this.mockAIResponse(message, userContext, financialData);
    }
    
    // Production implementation would use OpenAI API
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4-turbo-preview",
    //   messages: this.buildConversationContext(message, userContext, financialData),
    //   temperature: 0.7,
    //   max_tokens: 500
    // });
    // return response.choices[0].message.content;
  }

  buildConversationContext(message, userContext, financialData) {
    const systemPrompt = `You are HitFinance MoneyIQ, an advanced AI financial advisor for ${userContext.companyName || 'the user\'s company'}. 
    
    User Information:
    - Name: ${userContext.userName}
    - Company: ${userContext.companyName || 'HitFluence Media & Technology Group'}
    
    Current Financial Data:
    - Total Revenue: $${financialData.totalRevenue?.toFixed(2) || '0.00'}
    - Total Costs: $${financialData.totalCosts?.toFixed(2) || '0.00'}
    - Total Expenses: $${financialData.totalExpenses?.toFixed(2) || '0.00'}
    - Net Profit: $${financialData.netProfit?.toFixed(2) || '0.00'}
    - Profit Margin: ${financialData.profitMargin?.toFixed(1) || '0.0'}%
    
    Recent Transactions: ${financialData.recentTransactions?.length || 0} entries
    Expense Categories: ${Object.keys(financialData.expenseBreakdown || {}).join(', ')}
    
    Your role:
    - Provide actionable financial advice
    - Analyze spending patterns and suggest optimizations
    - Help identify profit opportunities
    - Answer questions about financial performance
    - Be conversational but professional
    - Always focus on making the business more profitable
    
    Keep responses concise (2-3 sentences max) and actionable.`;

    return [
      { role: "system", content: systemPrompt },
      ...this.conversationHistory,
      { role: "user", content: message }
    ];
  }

  async mockAIResponse(message, userContext, financialData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();
    
    // Contextual responses based on financial data
    if (lowerMessage.includes('profit') || lowerMessage.includes('profitable')) {
      if (financialData.netProfit > 0) {
        return `Great news ${userContext.userName}! Your current net profit of $${financialData.netProfit.toFixed(2)} shows healthy performance. To boost it further, consider reviewing your top expense categories - I see opportunities in optimizing your ${this.getTopExpenseCategory(financialData.expenseBreakdown)} spending.`;
      } else {
        return `${userContext.userName}, I notice your current profit margin needs attention. Let's focus on reducing your highest expenses first - your ${this.getTopExpenseCategory(financialData.expenseBreakdown)} category shows the most potential for cost savings. Would you like specific recommendations?`;
      }
    }
    
    if (lowerMessage.includes('revenue') || lowerMessage.includes('income') || lowerMessage.includes('sales')) {
      return `Your current revenue of $${financialData.totalRevenue.toFixed(2)} is ${this.getRevenueInsight(financialData)}. Based on your transaction patterns, I recommend focusing on ${this.getRevenueStrategy(financialData)} to increase your monthly recurring revenue.`;
    }
    
    if (lowerMessage.includes('expense') || lowerMessage.includes('cost') || lowerMessage.includes('spending')) {
      const topCategory = this.getTopExpenseCategory(financialData.expenseBreakdown);
      return `${userContext.userName}, your expenses total $${financialData.totalExpenses.toFixed(2)}. Your largest expense category is ${topCategory}. I suggest conducting a ${topCategory.toLowerCase()} audit - you could potentially save 15-20% by eliminating redundant services and negotiating better rates.`;
    }
    
    if (lowerMessage.includes('cash flow') || lowerMessage.includes('cashflow')) {
      return `Your cash flow shows ${financialData.netProfit >= 0 ? 'positive' : 'negative'} trends. To improve it, consider implementing 30-day payment terms with clients and 45-day terms with suppliers. This could improve your working capital by 15-25%.`;
    }
    
    if (lowerMessage.includes('forecast') || lowerMessage.includes('prediction') || lowerMessage.includes('future')) {
      return `Based on your current trajectory, I project ${this.getForecastInsight(financialData)}. The key growth levers I see are: optimizing your expense ratios and implementing value-based pricing strategies.`;
    }
    
    if (lowerMessage.includes('tax') || lowerMessage.includes('deduction')) {
      return `${userContext.userName}, ensure you're maximizing business deductions! Your current expense categories suggest potential tax savings of $${(financialData.totalExpenses * 0.25).toFixed(0)}+ annually. Focus on properly categorizing all business meals, travel, and office expenses.`;
    }
    
    if (lowerMessage.includes('subscription') || lowerMessage.includes('recurring')) {
      const subscriptionSpend = financialData.expenseBreakdown?.subscriptions || 0;
      return `Your subscription expenses are $${subscriptionSpend.toFixed(2)}. I recommend a quarterly subscription audit - most companies can reduce this by 20-30% by eliminating unused services and switching to annual plans for active tools.`;
    }
    
    if (lowerMessage.includes('growth') || lowerMessage.includes('scale') || lowerMessage.includes('expand')) {
      return `For sustainable growth, focus on improving your profit margins first. With your current ${financialData.profitMargin?.toFixed(1)}% margin, I recommend targeting 25-30% before scaling. This creates a stronger foundation for expansion investments.`;
    }
    
    if (lowerMessage.includes('benchmark') || lowerMessage.includes('industry') || lowerMessage.includes('compare')) {
      return `Compared to industry standards, your ${this.getBenchmarkInsight(financialData)}. The top-performing companies in your sector typically maintain 25-35% profit margins through strategic expense management and premium pricing.`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello ${userContext.userName}! I'm MoneyIQ, your AI financial advisor. I've analyzed your current financials and I'm ready to help optimize your profitability. What specific area would you like to focus on today?`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return `I can help you with profit optimization, expense analysis, revenue strategies, cash flow management, tax planning, and financial forecasting. Just ask me about any aspect of your finances, ${userContext.userName}!`;
    }
    
    // Default intelligent response
    return `That's a great question, ${userContext.userName}! Based on your current financial position with $${financialData.netProfit.toFixed(2)} net profit, I'd recommend focusing on your expense optimization first. Your ${this.getTopExpenseCategory(financialData.expenseBreakdown)} category shows the most potential for immediate savings. Would you like specific strategies for this area?`;
  }

  getTopExpenseCategory(expenseBreakdown) {
    if (!expenseBreakdown || Object.keys(expenseBreakdown).length === 0) {
      return 'operational expenses';
    }
    
    const categories = {
      subscriptions: 'subscription services',
      travel: 'travel and transportation',
      meals: 'meals and entertainment',
      office: 'office and administrative'
    };
    
    const topCategory = Object.entries(expenseBreakdown)
      .sort(([,a], [,b]) => b - a)[0]?.[0];
    
    return categories[topCategory] || topCategory || 'operational expenses';
  }

  getRevenueInsight(financialData) {
    const margin = financialData.profitMargin || 0;
    if (margin > 25) return 'performing well with strong margins';
    if (margin > 15) return 'showing good potential with room for optimization';
    return 'indicating opportunities for pricing strategy improvements';
  }

  getRevenueStrategy(financialData) {
    const strategies = [
      'client retention programs and upselling existing accounts',
      'value-based pricing for premium services',
      'recurring revenue models and subscription offerings',
      'strategic partnerships and referral programs'
    ];
    return strategies[Math.floor(Math.random() * strategies.length)];
  }

  getForecastInsight(financialData) {
    if (financialData.netProfit > 0) {
      return `continued growth with potential for 15-25% profit increase through strategic optimizations`;
    }
    return `break-even within 2-3 months by implementing the cost reduction strategies I can recommend`;
  }

  getBenchmarkInsight(financialData) {
    const margin = financialData.profitMargin || 0;
    if (margin > 20) return 'profit margins are above industry average - excellent work!';
    if (margin > 10) return 'profit margins are approaching industry standards with room for improvement';
    return 'profit margins are below industry benchmarks, but I can help you optimize them quickly';
  }

  addToHistory(userMessage, aiResponse) {
    this.conversationHistory.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: aiResponse }
    );
    
    // Keep only last 10 exchanges to manage context length
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getInitialMessage(userName) {
    const greetings = [
      `Hello ${userName}! How can I make you profitable today?`,
      `Hi ${userName}! Ready to optimize your finances? How can I make you profitable today?`,
      `Welcome back ${userName}! I've analyzed your latest data. How can I make you profitable today?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export const aiChatService = new AIChatService();

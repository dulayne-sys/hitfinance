// AI Financial Analysis Service
// Note: In production, you would use your own OpenAI API key and implement proper backend security

class AIFinancialService {
  constructor() {
    // This is a mock implementation for demo purposes
    // In production, implement this on your backend with proper API key management
    this.mockMode = true;
  }

  async generateIncomeStatement(ledgerData, expenseData, period = 'current') {
    if (this.mockMode) {
      return this.mockIncomeStatement(ledgerData, expenseData, period);
    }
    
    // Production implementation would call your backend API
    // which would then use OpenAI API with proper security
  }

  async generateBalanceSheet(ledgerData, expenseData, assets = {}) {
    if (this.mockMode) {
      return this.mockBalanceSheet(ledgerData, expenseData, assets);
    }
  }

  async generateFinancialInsights(ledgerData, expenseData, industry = 'technology') {
    if (this.mockMode) {
      return this.mockFinancialInsights(ledgerData, expenseData, industry);
    }
  }

  async generateProfitOptimizationTips(financialData, industry = 'technology') {
    if (this.mockMode) {
      return this.mockProfitOptimizationTips(financialData, industry);
    }
  }

  // Mock implementations for demo
  mockIncomeStatement(ledgerData, expenseData, period) {
    const totalRevenue = ledgerData
      .filter(item => item.type === 'revenue')
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const totalCosts = ledgerData
      .filter(item => item.type === 'cost')
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const totalExpenses = expenseData
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const grossProfit = totalRevenue - totalCosts;
    const operatingIncome = grossProfit - totalExpenses;
    const netIncome = operatingIncome; // Simplified for demo

    return {
      period: period,
      revenue: {
        totalRevenue,
        breakdown: this.categorizeRevenue(ledgerData)
      },
      costs: {
        totalCosts,
        breakdown: this.categorizeCosts(ledgerData)
      },
      expenses: {
        totalExpenses,
        breakdown: this.categorizeExpenses(expenseData)
      },
      profitability: {
        grossProfit,
        grossMargin: totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0,
        operatingIncome,
        operatingMargin: totalRevenue > 0 ? (operatingIncome / totalRevenue) * 100 : 0,
        netIncome,
        netMargin: totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0
      }
    };
  }

  mockBalanceSheet(ledgerData, expenseData, assets) {
    const totalRevenue = ledgerData
      .filter(item => item.type === 'revenue')
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const totalExpenses = expenseData
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    // Mock balance sheet calculations
    const cash = Math.max(totalRevenue - totalExpenses, 0);
    const accountsReceivable = totalRevenue * 0.15; // Assume 15% pending
    const inventory = totalExpenses * 0.1; // Assume 10% inventory
    const equipment = expenseData
      .filter(exp => exp.category === 'office' && exp.subcategory === 'Equipment')
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    const totalAssets = cash + accountsReceivable + inventory + equipment;
    const accountsPayable = totalExpenses * 0.1; // Assume 10% pending payments
    const totalLiabilities = accountsPayable;
    const equity = totalAssets - totalLiabilities;

    return {
      assets: {
        current: {
          cash,
          accountsReceivable,
          inventory,
          total: cash + accountsReceivable + inventory
        },
        fixed: {
          equipment,
          total: equipment
        },
        total: totalAssets
      },
      liabilities: {
        current: {
          accountsPayable,
          total: accountsPayable
        },
        total: totalLiabilities
      },
      equity: {
        retainedEarnings: equity,
        total: equity
      },
      ratios: {
        currentRatio: accountsPayable > 0 ? (cash + accountsReceivable + inventory) / accountsPayable : 0,
        debtToEquity: equity > 0 ? totalLiabilities / equity : 0,
        returnOnAssets: totalAssets > 0 ? (totalRevenue - totalExpenses) / totalAssets * 100 : 0
      }
    };
  }

  mockFinancialInsights(ledgerData, expenseData, industry) {
    const insights = [
      {
        type: 'warning',
        title: 'High Operating Expenses',
        description: 'Your operating expenses represent 65% of revenue, which is above the industry average of 45-55%.',
        impact: 'high',
        recommendation: 'Review subscription costs and negotiate better rates with vendors.'
      },
      {
        type: 'opportunity',
        title: 'Revenue Growth Potential',
        description: 'Your revenue growth rate is strong, but there\'s opportunity to optimize pricing strategy.',
        impact: 'medium',
        recommendation: 'Consider implementing tiered pricing or premium service offerings.'
      },
      {
        type: 'positive',
        title: 'Healthy Cash Flow',
        description: 'Your cash flow management is excellent with consistent positive trends.',
        impact: 'low',
        recommendation: 'Continue current cash management practices and consider investment opportunities.'
      },
      {
        type: 'warning',
        title: 'Travel Expenses Above Benchmark',
        description: 'Travel expenses are 15% higher than industry standards for similar-sized companies.',
        impact: 'medium',
        recommendation: 'Implement travel policy guidelines and consider virtual meeting alternatives.'
      }
    ];

    return {
      overallScore: 78,
      industryComparison: {
        profitMargin: { yours: 23, industry: 28, status: 'below' },
        operatingEfficiency: { yours: 82, industry: 75, status: 'above' },
        growthRate: { yours: 15, industry: 12, status: 'above' }
      },
      insights,
      keyMetrics: {
        burnRate: this.calculateBurnRate(expenseData),
        runway: this.calculateRunway(ledgerData, expenseData),
        customerAcquisitionCost: this.estimateCAC(ledgerData, expenseData)
      }
    };
  }

  mockProfitOptimizationTips(financialData, industry) {
    return [
      {
        category: 'Cost Reduction',
        priority: 'high',
        title: 'Optimize Software Subscriptions',
        description: 'Audit all software subscriptions and eliminate redundant tools. Consider annual plans for 15-20% savings.',
        potentialSavings: '$2,400/year',
        implementation: 'immediate',
        effort: 'low'
      },
      {
        category: 'Revenue Enhancement',
        priority: 'high',
        title: 'Implement Value-Based Pricing',
        description: 'Top-performing companies in your industry use value-based pricing to increase margins by 25-30%.',
        potentialGain: '$8,500/month',
        implementation: '2-3 months',
        effort: 'medium'
      },
      {
        category: 'Operational Efficiency',
        priority: 'medium',
        title: 'Automate Financial Processes',
        description: 'Implement automated invoicing and expense tracking to reduce administrative costs by 40%.',
        potentialSavings: '$1,800/month',
        implementation: '1-2 months',
        effort: 'medium'
      },
      {
        category: 'Tax Optimization',
        priority: 'medium',
        title: 'Maximize Business Deductions',
        description: 'Ensure all eligible business expenses are properly categorized for tax deductions.',
        potentialSavings: '$3,200/year',
        implementation: 'immediate',
        effort: 'low'
      },
      {
        category: 'Cash Flow',
        priority: 'high',
        title: 'Optimize Payment Terms',
        description: 'Negotiate 30-day payment terms with clients and 45-day terms with suppliers to improve cash flow.',
        potentialGain: '15% cash flow improvement',
        implementation: '1 month',
        effort: 'low'
      },
      {
        category: 'Investment',
        priority: 'low',
        title: 'Strategic Technology Investment',
        description: 'Invest in productivity tools that can increase team efficiency by 20-25%.',
        potentialGain: '$5,000/month',
        implementation: '3-6 months',
        effort: 'high'
      }
    ];
  }

  // Helper methods
  categorizeRevenue(ledgerData) {
    const revenueItems = ledgerData.filter(item => item.type === 'revenue');
    const categories = {};
    
    revenueItems.forEach(item => {
      const category = item.category || 'Other';
      categories[category] = (categories[category] || 0) + parseFloat(item.amount || 0);
    });
    
    return categories;
  }

  categorizeCosts(ledgerData) {
    const costItems = ledgerData.filter(item => item.type === 'cost');
    const categories = {};
    
    costItems.forEach(item => {
      const category = item.category || 'Other';
      categories[category] = (categories[category] || 0) + parseFloat(item.amount || 0);
    });
    
    return categories;
  }

  categorizeExpenses(expenseData) {
    const categories = {};
    
    expenseData.forEach(item => {
      const category = item.category || 'other';
      categories[category] = (categories[category] || 0) + parseFloat(item.amount || 0);
    });
    
    return categories;
  }

  calculateBurnRate(expenseData) {
    const monthlyExpenses = expenseData
      .filter(exp => {
        const expenseDate = new Date(exp.date);
        const currentMonth = new Date();
        return expenseDate.getMonth() === currentMonth.getMonth() && 
               expenseDate.getFullYear() === currentMonth.getFullYear();
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    
    return monthlyExpenses;
  }

  calculateRunway(ledgerData, expenseData) {
    const totalRevenue = ledgerData
      .filter(item => item.type === 'revenue')
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    const monthlyBurn = this.calculateBurnRate(expenseData);
    const currentCash = Math.max(totalRevenue - expenseData.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0), 0);
    
    return monthlyBurn > 0 ? Math.floor(currentCash / monthlyBurn) : Infinity;
  }

  estimateCAC(ledgerData, expenseData) {
    const marketingExpenses = expenseData
      .filter(exp => exp.category === 'office' && exp.subcategory === 'Marketing Tools')
      .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    
    // Mock customer count - in real implementation, this would come from your CRM
    const estimatedCustomers = 50;
    
    return estimatedCustomers > 0 ? marketingExpenses / estimatedCustomers : 0;
  }
}

export const aiFinancialService = new AIFinancialService();

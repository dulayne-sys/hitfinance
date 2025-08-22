// Bank Connection and AI Transaction Analysis Service
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../App';

class BankConnectionService {
  constructor() {
    // Mock mode for demo - in production, integrate with Plaid, Yodlee, or similar
    this.mockMode = true;
    this.supportedBanks = [
      {
        id: 'chase',
        name: 'Chase Bank',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Chase-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit']
      },
      {
        id: 'bofa',
        name: 'Bank of America',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Bank-of-America-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit', 'investment']
      },
      {
        id: 'wells_fargo',
        name: 'Wells Fargo',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Wells-Fargo-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit']
      },
      {
        id: 'citi',
        name: 'Citibank',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Citibank-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit', 'investment']
      },
      {
        id: 'capital_one',
        name: 'Capital One',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Capital-One-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit']
      },
      {
        id: 'truist',
        name: 'Truist Bank',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/Truist-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit', 'investment', 'zelle']
      },
      {
        id: 'usbank',
        name: 'U.S. Bank',
        logo: 'https://logos-world.net/wp-content/uploads/2021/02/US-Bank-Logo.png',
        type: 'major',
        features: ['checking', 'savings', 'credit']
      }
    ];
  }

  async connectBank(userId, bankId, credentials) {
    if (this.mockMode) {
      return this.mockBankConnection(userId, bankId, credentials);
    }
    
    // Production implementation would use Plaid Link or similar
    // const linkToken = await this.createLinkToken(userId);
    // return this.exchangePublicToken(publicToken);
  }

  async mockBankConnection(userId, bankId, credentials) {
    const bank = this.supportedBanks.find(b => b.id === bankId);
    if (!bank) throw new Error('Bank not supported');

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const connectionData = {
      bankId,
      bankName: bank.name,
      bankLogo: bank.logo,
      accountId: `acc_${Math.random().toString(36).substr(2, 9)}`,
      accessToken: `access_${Math.random().toString(36).substr(2, 16)}`,
      connectedAt: serverTimestamp(),
      status: 'connected',
      lastSync: serverTimestamp(),
      accounts: await this.generateMockAccounts(bank)
    };

    // Save to Firebase
    const docRef = await addDoc(collection(db, `users/${userId}/bankConnections`), connectionData);
    
    // Generate and analyze mock transactions
    const transactions = await this.generateMockTransactions(bank.id);
    const analyzedData = await this.analyzeTransactionsWithAI(transactions);
    
    // Auto-populate ledger and expenses
    await this.autoPopulateFinancialData(userId, analyzedData);

    return { id: docRef.id, ...connectionData };
  }

  async generateMockAccounts(bank) {
    return [
      {
        id: `checking_${Math.random().toString(36).substr(2, 6)}`,
        name: 'Business Checking',
        type: 'checking',
        balance: 25000 + Math.random() * 50000,
        currency: 'USD',
        mask: '1234'
      },
      {
        id: `savings_${Math.random().toString(36).substr(2, 6)}`,
        name: 'Business Savings',
        type: 'savings',
        balance: 75000 + Math.random() * 100000,
        currency: 'USD',
        mask: '5678'
      }
    ];
  }

  async generateMockTransactions(bankId) {
    const transactions = [];
    const currentDate = new Date();
    
    // Generate 90 days of mock transactions
    for (let i = 0; i < 90; i++) {
      const transactionDate = new Date(currentDate);
      transactionDate.setDate(currentDate.getDate() - i);
      
      // Generate 1-5 transactions per day
      const dailyTransactions = Math.floor(Math.random() * 5) + 1;
      
      for (let j = 0; j < dailyTransactions; j++) {
        transactions.push(this.generateMockTransaction(transactionDate));
      }
    }
    
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  generateMockTransaction(date) {
    const transactionTypes = [
      // Revenue transactions
      { description: 'Client Payment - ABC Corp', amount: 5000, type: 'revenue', category: 'Client Services' },
      { description: 'Consulting Fee - XYZ Ltd', amount: 3500, type: 'revenue', category: 'Consulting' },
      { description: 'Project Payment - Tech Solutions', amount: 7500, type: 'revenue', category: 'Project Work' },
      { description: 'Monthly Retainer - StartupCo', amount: 4000, type: 'revenue', category: 'Retainer' },
      
      // Business expenses
      { description: 'Office Rent', amount: -2500, type: 'expense', category: 'office', subcategory: 'Utilities' },
      { description: 'Adobe Creative Suite', amount: -52.99, type: 'expense', category: 'subscriptions', subcategory: 'Software' },
      { description: 'AWS Services', amount: -234.56, type: 'expense', category: 'subscriptions', subcategory: 'Cloud Storage' },
      { description: 'Uber Business', amount: -45.30, type: 'expense', category: 'travel', subcategory: 'Public Transport' },
      { description: 'Business Lunch - Client Meeting', amount: -89.45, type: 'expense', category: 'meals', subcategory: 'Business Meals' },
      { description: 'Office Supplies - Staples', amount: -156.78, type: 'expense', category: 'office', subcategory: 'Supplies' },
      { description: 'Internet Bill - Comcast', amount: -89.99, type: 'expense', category: 'office', subcategory: 'Internet' },
      { description: 'Phone Bill - Verizon', amount: -125.50, type: 'expense', category: 'office', subcategory: 'Phone' },
      
      // Costs
      { description: 'Contractor Payment - John Doe', amount: -2000, type: 'cost', category: 'Labor' },
      { description: 'Software License - Microsoft', amount: -299.99, type: 'cost', category: 'Software' },
      { description: 'Equipment Purchase - Dell', amount: -1299.99, type: 'cost', category: 'Equipment' }
    ];

    const randomTransaction = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    
    return {
      id: `txn_${Math.random().toString(36).substr(2, 12)}`,
      date: date.toISOString().split('T')[0],
      description: randomTransaction.description,
      amount: Math.abs(randomTransaction.amount) * (randomTransaction.amount < 0 ? -1 : 1),
      type: randomTransaction.type,
      category: randomTransaction.category,
      subcategory: randomTransaction.subcategory || null,
      merchant: this.extractMerchant(randomTransaction.description),
      confidence: 0.85 + Math.random() * 0.15 // AI confidence score
    };
  }

  extractMerchant(description) {
    // Simple merchant extraction logic
    const parts = description.split(' - ');
    return parts.length > 1 ? parts[1] : parts[0].split(' ')[0];
  }

  async analyzeTransactionsWithAI(transactions) {
    // Mock AI analysis - in production, this would use OpenAI or similar
    const analyzed = {
      ledgerEntries: [],
      expenseEntries: [],
      insights: {
        totalRevenue: 0,
        totalCosts: 0,
        totalExpenses: 0,
        topCategories: {},
        recurringTransactions: [],
        anomalies: []
      }
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'revenue') {
        analyzed.ledgerEntries.push({
          date: transaction.date,
          description: transaction.description,
          category: transaction.category,
          type: 'revenue',
          amount: Math.abs(transaction.amount),
          source: 'bank_import',
          confidence: transaction.confidence
        });
        analyzed.insights.totalRevenue += Math.abs(transaction.amount);
      } else if (transaction.type === 'cost') {
        analyzed.ledgerEntries.push({
          date: transaction.date,
          description: transaction.description,
          category: transaction.category,
          type: 'cost',
          amount: Math.abs(transaction.amount),
          source: 'bank_import',
          confidence: transaction.confidence
        });
        analyzed.insights.totalCosts += Math.abs(transaction.amount);
      } else if (transaction.type === 'expense') {
        analyzed.expenseEntries.push({
          date: transaction.date,
          description: transaction.description,
          category: transaction.category,
          subcategory: transaction.subcategory,
          amount: Math.abs(transaction.amount),
          vendor: transaction.merchant,
          source: 'bank_import',
          confidence: transaction.confidence,
          isRecurring: this.detectRecurring(transaction, transactions)
        });
        analyzed.insights.totalExpenses += Math.abs(transaction.amount);
      }

      // Track categories
      const category = transaction.category || 'Other';
      analyzed.insights.topCategories[category] = (analyzed.insights.topCategories[category] || 0) + Math.abs(transaction.amount);
    });

    // Detect recurring transactions
    analyzed.insights.recurringTransactions = this.detectRecurringTransactions(transactions);
    
    // Detect anomalies
    analyzed.insights.anomalies = this.detectAnomalies(transactions);

    return analyzed;
  }

  detectRecurring(transaction, allTransactions) {
    // Simple recurring detection - look for similar amounts and descriptions
    const similar = allTransactions.filter(t => 
      t.id !== transaction.id &&
      Math.abs(t.amount - transaction.amount) < 5 &&
      t.description.toLowerCase().includes(transaction.merchant.toLowerCase())
    );
    return similar.length >= 2;
  }

  detectRecurringTransactions(transactions) {
    const recurring = [];
    const grouped = {};

    transactions.forEach(transaction => {
      const key = `${transaction.merchant}_${Math.round(Math.abs(transaction.amount))}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(transaction);
    });

    Object.entries(grouped).forEach(([key, group]) => {
      if (group.length >= 3) {
        recurring.push({
          merchant: group[0].merchant,
          amount: group[0].amount,
          frequency: this.calculateFrequency(group),
          confidence: 0.9,
          category: group[0].category
        });
      }
    });

    return recurring;
  }

  calculateFrequency(transactions) {
    if (transactions.length < 2) return 'unknown';
    
    const dates = transactions.map(t => new Date(t.date)).sort();
    const intervals = [];
    
    for (let i = 1; i < dates.length; i++) {
      const days = (dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24);
      intervals.push(days);
    }
    
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    
    if (avgInterval <= 10) return 'weekly';
    if (avgInterval <= 35) return 'monthly';
    if (avgInterval <= 100) return 'quarterly';
    return 'yearly';
  }

  detectAnomalies(transactions) {
    const anomalies = [];
    
    // Detect unusually large transactions
    const amounts = transactions.map(t => Math.abs(t.amount));
    const avgAmount = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
    const threshold = avgAmount * 3;
    
    transactions.forEach(transaction => {
      if (Math.abs(transaction.amount) > threshold) {
        anomalies.push({
          transaction,
          type: 'large_amount',
          description: `Transaction amount (${Math.abs(transaction.amount)}) is ${Math.round(Math.abs(transaction.amount) / avgAmount)}x larger than average`,
          severity: 'medium'
        });
      }
    });

    return anomalies;
  }

  async autoPopulateFinancialData(userId, analyzedData) {
    try {
      // Add ledger entries
      for (const entry of analyzedData.ledgerEntries) {
        await addDoc(collection(db, `users/${userId}/ledger`), {
          ...entry,
          date: new Date(entry.date),
          createdAt: serverTimestamp(),
          importedAt: serverTimestamp()
        });
      }

      // Add expense entries
      for (const entry of analyzedData.expenseEntries) {
        await addDoc(collection(db, `users/${userId}/expenses`), {
          ...entry,
          date: new Date(entry.date),
          notes: `Auto-imported from bank (${(entry.confidence * 100).toFixed(1)}% confidence)`,
          createdAt: serverTimestamp(),
          importedAt: serverTimestamp()
        });
      }

      return {
        ledgerCount: analyzedData.ledgerEntries.length,
        expenseCount: analyzedData.expenseEntries.length,
        insights: analyzedData.insights
      };
    } catch (error) {
      console.error('Error auto-populating financial data:', error);
      throw error;
    }
  }

  async getBankConnections(userId) {
    return new Promise((resolve) => {
      const q = query(collection(db, `users/${userId}/bankConnections`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const connections = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        resolve(connections);
        unsubscribe();
      });
    });
  }

  async disconnectBank(userId, connectionId) {
    try {
      await deleteDoc(doc(db, `users/${userId}/bankConnections`, connectionId));
      return true;
    } catch (error) {
      console.error('Error disconnecting bank:', error);
      throw error;
    }
  }

  async syncBankData(userId, connectionId) {
    // Mock sync process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update last sync time
    await updateDoc(doc(db, `users/${userId}/bankConnections`, connectionId), {
      lastSync: serverTimestamp()
    });

    return {
      newTransactions: Math.floor(Math.random() * 10) + 1,
      syncedAt: new Date()
    };
  }

  getSupportedBanks() {
    return this.supportedBanks;
  }
}

export const bankConnectionService = new BankConnectionService();

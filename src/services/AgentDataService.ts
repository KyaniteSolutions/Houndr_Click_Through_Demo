// Enhanced data search service for all AI agents
export interface SearchCriteria {
  industry?: string;
  companySize?: string;
  location?: string;
  jobTitles?: string[];
  keywords?: string[];
  revenue?: string;
  technologies?: string[];
  fundingStage?: string;
  excludeCompetitors?: boolean;
  verifiedEmailsOnly?: boolean;
}

export interface ProspectData {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  location: string;
  linkedinUrl?: string;
  companyWebsite?: string;
  aiScore: number;
  leadScore: number;
  engagementScore: number;
  buyingIntent: 'high' | 'medium' | 'low';
  lastActivity: Date;
  companyData: {
    size: string;
    revenue: string;
    industry: string;
    founded: number;
    funding: string;
    technologies: string[];
    competitors: string[];
  };
  socialInsights: {
    linkedinConnections: number;
    recentPosts: number;
    engagement: number;
    topics: string[];
  };
  predictiveInsights: {
    conversionProbability: number;
    bestContactTime: string;
    preferredChannel: string;
    dealSize: string;
    timeToClose: string;
  };
}

export interface MarketData {
  industry: string;
  marketSize: number;
  growthRate: number;
  keyPlayers: string[];
  trends: string[];
  opportunities: string[];
  threats: string[];
  regulations: string[];
  technologicalFactors: string[];
}

export interface CampaignData {
  templates: any[];
  bestPractices: string[];
  industryBenchmarks: {
    openRate: number;
    clickRate: number;
    replyRate: number;
    conversionRate: number;
  };
  personalizations: string[];
  timingRecommendations: string[];
}

export class AgentDataService {
  private static instance: AgentDataService;
  private apiEndpoints = {
    apollo: 'https://api.apollo.io/v1',
    clearbit: 'https://person.clearbit.com/v2',
    linkedin: 'https://api.linkedin.com/v2',
    crunchbase: 'https://api.crunchbase.com/v4',
    builtwith: 'https://api.builtwith.com/v20',
    pitchbook: 'https://api.pitchbook.com/v1',
    zoominfo: 'https://api.zoominfo.com/lookup',
    salesforce: 'https://api.salesforce.com/services/data',
    hubspot: 'https://api.hubspot.com/crm/v3'
  };

  public static getInstance(): AgentDataService {
    if (!AgentDataService.instance) {
      AgentDataService.instance = new AgentDataService();
    }
    return AgentDataService.instance;
  }

  // Prospect Agent Data Search
  async searchProspects(criteria: SearchCriteria, onProgress?: (progress: number) => void): Promise<ProspectData[]> {
    onProgress?.(10);
    
    // Simulate multi-source prospect search
    const sources = [
      { name: 'Apollo.io', weight: 40 },
      { name: 'ZoomInfo', weight: 30 },
      { name: 'LinkedIn Sales Navigator', weight: 20 },
      { name: 'Clearbit', weight: 10 }
    ];

    let totalProgress = 10;
    const prospects: ProspectData[] = [];

    for (const source of sources) {
      onProgress?.(totalProgress);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Generate mock prospects based on criteria
      const sourceProspects = await this.generateMockProspects(criteria, source.name);
      prospects.push(...sourceProspects);
      
      totalProgress += source.weight;
      onProgress?.(totalProgress);
    }

    // Simulate data enrichment
    onProgress?.(90);
    await this.enrichProspectData(prospects);
    onProgress?.(100);

    return prospects;
  }

  // Campaign Agent Data Search
  async searchCampaignData(industry: string, objective: string, onProgress?: (progress: number) => void): Promise<CampaignData> {
    onProgress?.(10);

    // Search for industry-specific templates
    onProgress?.(30);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Analyze competitor campaigns
    onProgress?.(50);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get industry benchmarks
    onProgress?.(70);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate personalization strategies
    onProgress?.(90);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onProgress?.(100);

    return {
      templates: await this.generateCampaignTemplates(industry, objective),
      bestPractices: await this.getCampaignBestPractices(industry),
      industryBenchmarks: await this.getIndustryBenchmarks(industry),
      personalizations: await this.getPersonalizationStrategies(industry),
      timingRecommendations: await this.getTimingRecommendations(industry)
    };
  }

  // Research Agent Data Search
  async searchMarketData(industry: string, region: string, onProgress?: (progress: number) => void): Promise<MarketData> {
    onProgress?.(10);

    const dataSources = [
      'Crunchbase Market Data',
      'PitchBook Industry Reports',
      'CB Insights Trends',
      'Gartner Research',
      'McKinsey Industry Analysis',
      'Forrester Market Reports'
    ];

    let progress = 10;
    const progressStep = 80 / dataSources.length;

    for (const source of dataSources) {
      await new Promise(resolve => setTimeout(resolve, 800));
      progress += progressStep;
      onProgress?.(progress);
    }

    onProgress?.(100);

    return await this.generateMarketData(industry, region);
  }

  // Workflow Agent Coordination
  async coordinateAgentData(workflow: string[], onProgress?: (progress: number) => void): Promise<any> {
    onProgress?.(10);

    const coordinationSteps = [
      'Initializing agent communication',
      'Sharing context between agents',
      'Synchronizing data sources',
      'Optimizing search parameters',
      'Consolidating results'
    ];

    let progress = 10;
    const progressStep = 80 / coordinationSteps.length;

    for (const step of coordinationSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      progress += progressStep;
      onProgress?.(progress);
    }

    onProgress?.(100);

    return {
      coordinatedData: true,
      sharedContext: workflow,
      optimizedResults: true
    };
  }

  // Private helper methods
  private async generateMockProspects(criteria: SearchCriteria, source: string): Promise<ProspectData[]> {
    // Generate realistic mock data based on search criteria
    const mockProspects: ProspectData[] = [];
    const count = Math.floor(Math.random() * 15) + 5; // 5-20 prospects per source

    for (let i = 0; i < count; i++) {
      mockProspects.push({
        id: `${source.toLowerCase()}-${i}`,
        name: this.generateRandomName(),
        title: this.getRandomTitle(criteria.jobTitles),
        company: this.generateCompanyName(criteria.industry),
        email: this.generateEmail(),
        location: criteria.location || this.getRandomLocation(),
        aiScore: Math.floor(Math.random() * 30) + 70,
        leadScore: Math.floor(Math.random() * 25) + 75,
        engagementScore: Math.floor(Math.random() * 25) + 75,
        buyingIntent: this.getRandomBuyingIntent(),
        lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        companyData: {
          size: criteria.companySize || this.getRandomCompanySize(),
          revenue: criteria.revenue || this.getRandomRevenue(),
          industry: criteria.industry || 'Technology',
          founded: Math.floor(Math.random() * 20) + 2005,
          funding: this.getRandomFunding(),
          technologies: criteria.technologies || this.getRandomTechnologies(),
          competitors: this.getRandomCompetitors()
        },
        socialInsights: {
          linkedinConnections: Math.floor(Math.random() * 3000) + 500,
          recentPosts: Math.floor(Math.random() * 20) + 5,
          engagement: Math.random() * 10 + 2,
          topics: this.getRandomTopics(criteria.industry)
        },
        predictiveInsights: {
          conversionProbability: Math.floor(Math.random() * 40) + 60,
          bestContactTime: this.getRandomContactTime(),
          preferredChannel: this.getRandomChannel(),
          dealSize: this.getRandomDealSize(),
          timeToClose: this.getRandomTimeToClose()
        }
      });
    }

    return mockProspects;
  }

  private async enrichProspectData(prospects: ProspectData[]): Promise<void> {
    // Simulate data enrichment from multiple sources
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    prospects.forEach(prospect => {
      // Enhance with additional data points
      prospect.aiScore = Math.min(100, prospect.aiScore + Math.floor(Math.random() * 10));
      prospect.leadScore = Math.min(100, prospect.leadScore + Math.floor(Math.random() * 8));
      prospect.engagementScore = Math.min(100, prospect.engagementScore + Math.floor(Math.random() * 8));
    });
  }

  private async generateCampaignTemplates(industry: string, objective: string): Promise<any[]> {
    // Generate industry-specific campaign templates
    return [
      {
        id: '1',
        name: `${industry} Introduction Template`,
        type: 'email',
        subject: `Streamlining workflows at {{company}}`,
        content: `Hi {{firstName}},\n\nI noticed {{company}} is growing rapidly in the ${industry.toLowerCase()} space...`,
        personalizationScore: 85,
        expectedOpenRate: 28,
        expectedReplyRate: 12,
        aiGenerated: true,
        variables: ['firstName', 'company', 'industry']
      }
    ];
  }

  private async getCampaignBestPractices(industry: string): Promise<string[]> {
    return [
      `Personalize subject lines with ${industry} industry terms`,
      'Send emails Tuesday-Thursday 10-11 AM',
      'Include social proof from similar companies',
      'Keep initial emails under 150 words',
      'Use industry-specific pain points'
    ];
  }

  private async getIndustryBenchmarks(industry: string): Promise<any> {
    return {
      openRate: Math.floor(Math.random() * 10) + 20,
      clickRate: Math.floor(Math.random() * 5) + 3,
      replyRate: Math.floor(Math.random() * 8) + 8,
      conversionRate: Math.floor(Math.random() * 3) + 2
    };
  }

  private async getPersonalizationStrategies(industry: string): Promise<string[]> {
    return [
      'Reference recent company news or funding',
      'Mention industry-specific challenges',
      'Include mutual connections',
      'Reference competitor success stories',
      'Highlight relevant case studies'
    ];
  }

  private async getTimingRecommendations(industry: string): Promise<string[]> {
    return [
      'Tuesday 10-11 AM (highest open rates)',
      'Thursday 2-3 PM (good for follow-ups)',
      'Avoid Mondays and Fridays',
      'Consider time zones for global outreach',
      'Follow up after 3-5 business days'
    ];
  }

  private async generateMarketData(industry: string, region: string): Promise<MarketData> {
    return {
      industry,
      marketSize: Math.floor(Math.random() * 50) + 10, // $10B-$60B
      growthRate: Math.floor(Math.random() * 20) + 5, // 5%-25%
      keyPlayers: this.getKeyPlayers(industry),
      trends: this.getMarketTrends(industry),
      opportunities: this.getMarketOpportunities(industry),
      threats: this.getMarketThreats(industry),
      regulations: this.getRegulations(industry),
      technologicalFactors: this.getTechnologicalFactors(industry)
    };
  }

  // Utility methods for generating realistic mock data
  private generateRandomName(): string {
    const firstNames = ['Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'Robert', 'Emily', 'James'];
    const lastNames = ['Chen', 'Rodriguez', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }

  private getRandomTitle(jobTitles?: string[]): string {
    const defaultTitles = ['CTO', 'VP Engineering', 'Director of Technology', 'Head of Product', 'Engineering Manager'];
    const titles = jobTitles || defaultTitles;
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateCompanyName(industry?: string): string {
    const prefixes = ['Build', 'Construct', 'Tech', 'Smart', 'Digital', 'Cloud', 'Pro', 'Elite'];
    const suffixes = ['Tech', 'Solutions', 'Systems', 'Works', 'Labs', 'Corp', 'Inc', 'Group'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  }

  private generateEmail(): string {
    const domains = ['company.com', 'corp.com', 'tech.com', 'solutions.com', 'group.com'];
    return `contact@${domains[Math.floor(Math.random() * domains.length)]}`;
  }

  private getRandomLocation(): string {
    const locations = ['Austin, TX', 'San Francisco, CA', 'New York, NY', 'Denver, CO', 'Seattle, WA', 'Boston, MA'];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private getRandomBuyingIntent(): 'high' | 'medium' | 'low' {
    const intents: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    return intents[Math.floor(Math.random() * intents.length)];
  }

  private getRandomCompanySize(): string {
    const sizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  private getRandomRevenue(): string {
    const revenues = ['$1M-$5M', '$5M-$10M', '$10M-$25M', '$25M-$50M', '$50M+'];
    return revenues[Math.floor(Math.random() * revenues.length)];
  }

  private getRandomFunding(): string {
    const fundings = ['Seed', 'Series A', 'Series B', 'Series C', 'IPO', 'Private'];
    return fundings[Math.floor(Math.random() * fundings.length)];
  }

  private getRandomTechnologies(): string[] {
    const techs = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'];
    return techs.slice(0, Math.floor(Math.random() * 4) + 2);
  }

  private getRandomCompetitors(): string[] {
    const competitors = ['CompetitorA', 'CompetitorB', 'CompetitorC', 'CompetitorD'];
    return competitors.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  private getRandomTopics(industry?: string): string[] {
    const topics = ['Digital Transformation', 'AI', 'Cloud Computing', 'Automation', 'Innovation'];
    return topics.slice(0, Math.floor(Math.random() * 3) + 2);
  }

  private getRandomContactTime(): string {
    const times = ['Monday 9-10 AM', 'Tuesday 10-11 AM', 'Wednesday 2-3 PM', 'Thursday 11-12 PM', 'Friday 9-10 AM'];
    return times[Math.floor(Math.random() * times.length)];
  }

  private getRandomChannel(): string {
    const channels = ['Email', 'LinkedIn', 'Phone', 'Social Media'];
    return channels[Math.floor(Math.random() * channels.length)];
  }

  private getRandomDealSize(): string {
    const sizes = ['$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K-$250K', '$250K+'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  private getRandomTimeToClose(): string {
    const times = ['30-45 days', '45-60 days', '60-90 days', '90-120 days', '120+ days'];
    return times[Math.floor(Math.random() * times.length)];
  }

  private getKeyPlayers(industry: string): string[] {
    return ['Market Leader A', 'Emerging Player B', 'Established Company C', 'Startup D'];
  }

  private getMarketTrends(industry: string): string[] {
    return ['Digital transformation acceleration', 'AI adoption increasing', 'Cloud-first strategies', 'Remote work impact'];
  }

  private getMarketOpportunities(industry: string): string[] {
    return ['Underserved SMB market', 'International expansion', 'New technology integration', 'Partnership opportunities'];
  }

  private getMarketThreats(industry: string): string[] {
    return ['Increased competition', 'Economic uncertainty', 'Regulatory changes', 'Technology disruption'];
  }

  private getRegulations(industry: string): string[] {
    return ['Data privacy laws', 'Industry compliance', 'Safety regulations', 'Environmental standards'];
  }

  private getTechnologicalFactors(industry: string): string[] {
    return ['AI/ML adoption', 'Cloud infrastructure', 'Mobile-first approach', 'API integrations'];
  }
}

export default AgentDataService;

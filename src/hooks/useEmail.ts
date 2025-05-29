import { useState, useEffect } from 'react';
import { Email } from '../types';

// Re-using the mock data from useEmails
const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Project Update - Q2 Deliverables',
    sender: {
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    },
    preview: 'Hi team, I wanted to provide an update on our Q2 deliverables. We\'re currently on track with most items, but there are a few areas where we might need to adjust timelines.',
    body: '<p>Hi team,</p><p>I wanted to provide an update on our Q2 deliverables. We\'re currently on track with most items, but there are a few areas where we might need to adjust timelines.</p><p>Here\'s a breakdown of our current status:</p><ul><li><strong>Feature A</strong>: Completed ahead of schedule</li><li><strong>Feature B</strong>: On track for June 15 release</li><li><strong>Feature C</strong>: Facing some technical challenges, might slip by 1-2 weeks</li></ul><p>Let\'s discuss in our next team meeting how to address the potential delays.</p><p>Best regards,<br>Alex</p>',
    date: new Date('2025-05-01T10:45:00').toISOString(),
    time: '10:45 AM',
    unread: true,
    starred: false,
    labels: [
      { name: 'Important', color: 'red' },
      { name: 'Work', color: 'blue' }
    ],
    attachments: [
      { name: 'Q2_Report.pdf', size: '2.4 MB', type: 'application/pdf' },
      { name: 'Project_Timeline.xlsx', size: '1.1 MB', type: 'application/xlsx' }
    ],
    aiAnalysis: {
      intent: 'Status Update',
      sentiment: 'Neutral',
      priority: 'Medium',
      entities: [
        { type: 'Date', value: 'June 15' },
        { type: 'Project', value: 'Feature C' }
      ]
    }
  },
  {
    id: '2',
    subject: 'Invoice #INV-2025-0423',
    sender: {
      name: 'Billing Department',
      email: 'billing@acmecorp.com',
      avatar: '',
      verified: true
    },
    preview: 'Please find attached invoice #INV-2025-0423 for your recent purchase. Payment is due within 30 days.',
    body: '<p>Dear Customer,</p><p>Thank you for your business. Please find attached invoice #INV-2025-0423 for your recent purchase.</p><p><strong>Invoice Details:</strong></p><ul><li>Invoice Number: INV-2025-0423</li><li>Date: April 23, 2025</li><li>Amount Due: $1,299.99</li><li>Due Date: May 23, 2025</li></ul><p>Payment can be made via bank transfer or credit card through our customer portal.</p><p>If you have any questions, please don\'t hesitate to contact our billing department.</p><p>Best regards,<br>Billing Department<br>ACME Corporation</p>',
    date: new Date('2025-04-23T09:12:00').toISOString(),
    time: 'Apr 23',
    unread: true,
    starred: true,
    labels: [
      { name: 'Finance', color: 'green' }
    ],
    attachments: [
      { name: 'Invoice_INV-2025-0423.pdf', size: '156 KB', type: 'application/pdf' }
    ],
    aiAnalysis: {
      intent: 'Payment Request',
      sentiment: 'Neutral',
      priority: 'High',
      entities: [
        { type: 'Invoice', value: 'INV-2025-0423' },
        { type: 'Amount', value: '$1,299.99' },
        { type: 'Date', value: 'May 23, 2025' }
      ]
    }
  },
  {
    id: '3',
    subject: 'Meeting Recap - Product Strategy',
    sender: {
      name: 'Sarah Williams',
      email: 'sarah.w@designstudio.co',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: false
    },
    preview: 'Thanks everyone for the productive discussion during today\'s product strategy meeting. I\'ve summarized the key points and action items.',
    body: '<p>Hi team,</p><p>Thanks everyone for the productive discussion during today\'s product strategy meeting. I\'ve summarized the key points and action items below:</p><h3>Key Decisions:</h3><ul><li>We will focus on the mobile experience for Q3</li><li>New user onboarding flow will be redesigned</li><li>Premium features will be bundled into a new subscription tier</li></ul><h3>Action Items:</h3><ul><li>John: Prepare user research plan by Friday</li><li>Melissa: Share competitive analysis</li><li>Dev team: Estimate effort for the new features</li><li>Everyone: Review the proposed roadmap by EOW</li></ul><p>The next strategy meeting is scheduled for May 15th at 2 PM.</p><p>Best,<br>Sarah</p>',
    date: new Date('2025-04-18T16:30:00').toISOString(),
    time: 'Apr 18',
    unread: false,
    starred: false,
    labels: [
      { name: 'Meeting', color: 'yellow' }
    ],
    attachments: [],
    aiAnalysis: {
      intent: 'Information Sharing',
      sentiment: 'Positive',
      priority: 'Medium',
      entities: [
        { type: 'Date', value: 'May 15th' },
        { type: 'Person', value: 'John' },
        { type: 'Person', value: 'Melissa' }
      ]
    }
  },
  {
    id: '4',
    subject: 'Your Flight Confirmation - NY to SF',
    sender: {
      name: 'TravelEasy Bookings',
      email: 'bookings@traveleasy.com',
      avatar: '',
      verified: true
    },
    preview: 'Your flight from New York (JFK) to San Francisco (SFO) on May 12, 2025 has been confirmed. Confirmation code: TRV29X4.',
    body: '<p>Dear Traveler,</p><p>Your flight has been successfully booked. Below are your flight details:</p><table border="0" cellpadding="8" style="border-collapse: collapse;"><tr><th style="text-align: left;">Flight</th><td>AA 1234</td></tr><tr><th style="text-align: left;">From</th><td>New York (JFK)</td></tr><tr><th style="text-align: left;">To</th><td>San Francisco (SFO)</td></tr><tr><th style="text-align: left;">Date</th><td>May 12, 2025</td></tr><tr><th style="text-align: left;">Departure</th><td>7:45 AM EST</td></tr><tr><th style="text-align: left;">Arrival</th><td>11:20 AM PST</td></tr><tr><th style="text-align: left;">Confirmation Code</th><td>TRV29X4</td></tr></table><p>You can check in online 24 hours before your flight. Download your boarding pass or use our mobile app for a contactless experience.</p><p>Thank you for choosing TravelEasy for your journey.</p><p>Safe travels!<br>The TravelEasy Team</p>',
    date: new Date('2025-04-15T11:05:00').toISOString(),
    time: 'Apr 15',
    unread: false,
    starred: true,
    labels: [
      { name: 'Travel', color: 'blue' }
    ],
    attachments: [
      { name: 'Boarding_Pass.pdf', size: '240 KB', type: 'application/pdf' },
      { name: 'Itinerary.pdf', size: '180 KB', type: 'application/pdf' }
    ],
    aiAnalysis: {
      intent: 'Confirmation',
      sentiment: 'Neutral',
      priority: 'Medium',
      entities: [
        { type: 'Flight', value: 'AA 1234' },
        { type: 'Date', value: 'May 12, 2025' },
        { type: 'Location', value: 'New York (JFK)' },
        { type: 'Location', value: 'San Francisco (SFO)' },
        { type: 'Confirmation', value: 'TRV29X4' }
      ]
    }
  },
  {
    id: '5',
    subject: 'Urgent: Server Downtime Alert',
    sender: {
      name: 'System Monitoring',
      email: 'alerts@system-monitoring.com',
      avatar: '',
      verified: true
    },
    preview: 'ALERT: Production database server DB-PROD-01 is experiencing high CPU usage (98%) and may become unresponsive. Immediate action required.',
    body: '<p style="color: red; font-weight: bold;">⚠️ CRITICAL ALERT ⚠️</p><p>The following server is experiencing issues:</p><ul><li><strong>Server:</strong> DB-PROD-01</li><li><strong>Issue:</strong> High CPU Usage (98%)</li><li><strong>Started:</strong> 2025-04-10 08:23:15 UTC</li><li><strong>Status:</strong> Critical</li></ul><p>The database server is at risk of becoming unresponsive which may affect all production applications. Automatic scaling has been triggered but manual intervention may be required.</p><p>Please check the monitoring dashboard and take appropriate action immediately.</p><p>--<br>System Monitoring<br>This is an automated message. Please do not reply.</p>',
    date: new Date('2025-04-10T08:25:00').toISOString(),
    time: 'Apr 10',
    unread: false,
    starred: false,
    labels: [
      { name: 'Critical', color: 'red' },
      { name: 'System', color: 'yellow' }
    ],
    attachments: [],
    aiAnalysis: {
      intent: 'Alert',
      sentiment: 'Negative',
      priority: 'High',
      entities: [
        { type: 'Server', value: 'DB-PROD-01' },
        { type: 'Metric', value: 'CPU 98%' },
        { type: 'Time', value: '2025-04-10 08:23:15 UTC' }
      ]
    }
  }
];

export const useEmail = (id: string) => {
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmail = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call to fetch a specific email
      // const response = await fetch(`/api/email/${id}`);
      // const data = await response.json();
      // setEmail(data);
      
      // For the mock, we'll find the email in our mock data
      const foundEmail = mockEmails.find(email => email.id === id);
      
      if (foundEmail) {
        setEmail(foundEmail);
      } else {
        throw new Error('Email not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch email'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, [id]);

  return {
    email,
    isLoading,
    error,
    refetch: fetchEmail
  };
};
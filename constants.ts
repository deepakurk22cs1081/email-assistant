
import { Email } from './types';

export const FAQ_KNOWLEDGE_BASE = `
FAQ Knowledge Base for Sparkle Subscription Service:

Q1: How do I cancel my subscription?
A1: You can cancel your subscription at any time by going to your Account Settings page and clicking on 'Cancel Subscription'. There are no cancellation fees.

Q2: What is the refund policy?
A2: We offer a 30-day money-back guarantee for all new subscriptions. If you are not satisfied, contact support within 30 days of your purchase for a full refund. For monthly renewals, we do not offer refunds.

Q3: Can I change my subscription plan?
A3: Yes, you can upgrade or downgrade your plan from your Account Settings. The change will be prorated and take effect immediately.

Q4: How do I update my payment method?
A4: You can update your payment information under the 'Billing' section in your Account Settings.

Q5: Do you offer a free trial?
A5: Yes, we offer a 14-day free trial for new users on our Standard plan. You can sign up without a credit card.
`;

export const MOCK_EMAILS: Email[] = [
  {
    id: 'thread-1',
    senderName: 'Alice Johnson',
    senderEmail: 'alice.j@example.com',
    subject: 'Question about my subscription',
    snippet: "Hi, I was wondering how I can cancel my current plan. Is there a fee for this? Thanks, Alice",
    messages: [
      {
        id: 1,
        sender: 'user',
        text: "Hi, I was wondering how I can cancel my current plan. Is there a fee for this? Thanks, Alice",
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: 'thread-2',
    senderName: 'Bob Williams',
    senderEmail: 'bob.w@example.com',
    subject: 'Refund Request',
    snippet: "Hello, I signed up 2 weeks ago and I'm not satisfied with the service. Can I get a refund?",
    messages: [
      {
        id: 1,
        sender: 'user',
        text: "Hello, I signed up 2 weeks ago and I'm not satisfied with the service. Can I get a refund?",
        timestamp: '11:15 AM',
      },
    ],
  },
  {
    id: 'thread-3',
    senderName: 'Charlie Brown',
    senderEmail: 'charlie.b@example.com',
    subject: 'Re: Follow up on plan change',
    snippet: "That's great, thank you! I've upgraded my plan.",
    messages: [
       {
        id: 1,
        sender: 'user',
        text: "I'd like to upgrade to the Premium plan. How do I do that?",
        timestamp: 'Yesterday',
      },
      {
        id: 2,
        sender: 'assistant',
        text: "Hi Charlie, You can easily upgrade your plan from your Account Settings page. The change will be prorated. Let me know if you need help!",
        timestamp: 'Yesterday',
      },
      {
        id: 3,
        sender: 'user',
        text: "That's great, thank you! I've upgraded my plan.",
        timestamp: '1:20 PM',
      },
    ],
  },
  {
    id: 'thread-4',
    senderName: 'Diana Prince',
    senderEmail: 'diana.p@example.com',
    subject: 'Billing Issue',
    snippet: 'My card is expiring next month. How do I update it?',
    messages: [
       {
        id: 1,
        sender: 'user',
        text: 'My credit card is expiring next month. How do I update it to avoid service interruption?',
        timestamp: '2:00 PM',
      },
    ]
  }
];
   
export const INITIAL_STEPS = [
  {
    id: 1,
    name: 'Election Announcement',
    meta: 'Day 0 · ECI Declaration',
    tag: 'official',
    tagLabel: 'Official',
    emoji: '📣',
    title: 'Election Announcement & Schedule',
    subtitle:
      'The Election Commission of India formally announces election dates, marking the start of the entire electoral process.',
    sections: [
      {
        title: 'What Happens',
        items: [
          'ECI issues the official election schedule with polling dates',
          'Model Code of Conduct (MCC) comes into immediate effect',
          "Government machinery is handed over to ECI's oversight",
          'Election Observer appointments are announced',
        ],
      },
      {
        title: 'Key Actions by Citizens',
        items: [
          'Check if your name is on the electoral roll',
          'Verify your polling booth and constituency',
          'Ensure your EPIC (Voter ID) card is ready',
        ],
      },
    ],
    chips: ['Election Commission of India', 'Model Code of Conduct', 'Observer Deployment'],
  },
  {
    id: 2,
    name: 'Voter Registration',
    meta: 'Before Announcement · Form 6',
    tag: 'civic',
    tagLabel: 'Civic',
    emoji: '📝',
    title: 'Voter Registration',
    subtitle:
      'Every eligible citizen aged 18+ must be registered. Registration typically closes before the announcement, but this is the foundation.',
    sections: [
      {
        title: 'How to Register',
        items: [
          'Fill Form 6 online at voters.eci.gov.in or the Voter Helpline App',
          'Submit proof of age (birth certificate, Aadhaar, 10th marksheet)',
          'Submit proof of residence (utility bill, Aadhaar, ration card)',
          'Registration takes 4-6 weeks for processing',
        ],
      },
      {
        title: 'Eligibility Criteria',
        items: [
          'Indian citizen, 18 years of age as on qualifying date',
          'Ordinarily resident in the constituency',
          'Not of unsound mind or disqualified by law',
          'Not enrolled in another constituency',
        ],
      },
    ],
    chips: ['Form 6', 'EPIC Card', 'voters.eci.gov.in', 'Voter Helpline App'],
  },
  {
    id: 3,
    name: 'Model Code of Conduct',
    meta: 'From Announcement Day',
    tag: 'legal',
    tagLabel: 'Legal',
    emoji: '⚖️',
    title: 'Model Code of Conduct (MCC)',
    subtitle:
      'A set of guidelines issued by ECI to ensure free and fair elections. Binding on all parties, candidates, and the government.',
    sections: [
      {
        title: 'MCC Prohibitions',
        items: [
          'No new government schemes or freebies announcements',
          'No use of government machinery for campaign purposes',
          'No inflammatory speeches targeting communities',
          'No bribery or inducement of voters',
        ],
      },
      {
        title: 'MCC Permissions',
        items: [
          'Parties can continue policy discussions and campaigns',
          'Government can implement previously approved schemes',
          'Transfers of officials require ECI approval',
        ],
      },
    ],
    chips: ['MCC Violations', 'C-Vigil App', 'ECI Enforcement'],
  },
  {
    id: 4,
    name: 'Candidate Nomination',
    meta: 'Day 1–7 · Filing Period',
    tag: 'legal',
    tagLabel: 'Legal',
    emoji: '📋',
    title: 'Candidate Nomination',
    subtitle:
      'Candidates officially declare their intent to contest by filing nomination papers before the Returning Officer.',
    sections: [
      {
        title: 'Nomination Requirements',
        items: [
          'Submit Form 2B (nomination paper) to the Returning Officer',
          'Deposit ₹25,000 (General category) or ₹12,500 (SC/ST) as security',
          'Submit affidavit declaring criminal cases, assets, and liabilities',
          'Get at least 1 proposer from the constituency',
        ],
      },
      {
        title: 'Eligibility to Contest',
        items: [
          'Indian citizen, 25+ years for Lok Sabha',
          'Must be on electoral rolls of any constituency in India',
          'Not convicted with 2+ years imprisonment in certain offences',
          'Not holding an Office of Profit under Government',
        ],
      },
    ],
    chips: ['Form 2B', 'Returning Officer', 'Security Deposit', 'Affidavit'],
  },
  {
    id: 5,
    name: 'Scrutiny of Nominations',
    meta: 'Day 8 · Verification',
    tag: 'official',
    tagLabel: 'Official',
    emoji: '🔍',
    title: 'Scrutiny of Nominations',
    subtitle:
      'The Returning Officer examines all nomination papers for completeness and legal validity. Defective nominations may be rejected.',
    sections: [
      {
        title: 'Scrutiny Checks',
        items: [
          'Verification of age, citizenship, and residence proof',
          'Check for disqualifications under Representation of People Act',
          'Examination of affidavit accuracy and completeness',
          'Objections from other candidates are heard',
        ],
      },
      {
        title: 'After Scrutiny',
        items: [
          'Valid nominations are accepted with official receipt',
          'Defective nominations are given a chance to be cured',
          'Nominations rejected by RO can be appealed to High Court',
        ],
      },
    ],
    chips: ['Returning Officer', 'Representation of People Act', 'RPA 1951'],
  },
  {
    id: 6,
    name: 'Withdrawal of Candidature',
    meta: 'Day 9–11 · Last Date',
    tag: 'legal',
    tagLabel: 'Legal',
    emoji: '↩️',
    title: 'Withdrawal of Candidature',
    subtitle:
      'Candidates who change their mind may withdraw within a specified period. After this, the final list of contestants is prepared.',
    sections: [
      {
        title: 'Withdrawal Process',
        items: [
          'Submit written withdrawal notice to the Returning Officer',
          'Must be done personally or by authorized agent',
          'Cannot be undone once submitted',
          'Security deposit is refunded to withdrawn candidates',
        ],
      },
      {
        title: 'After Deadline',
        items: [
          'Final list of contesting candidates is published',
          'Ballot order is decided (usually alphabetical within party/independent groups)',
          'EVM programming begins with candidate names and symbols',
          'Symbol allotment for independent candidates finalised',
        ],
      },
    ],
    chips: ['Ballot Order', 'Symbol Allotment', 'Final Candidate List'],
  },
  {
    id: 7,
    name: 'Election Campaign',
    meta: 'Day 11 to Day N-2',
    tag: 'civic',
    tagLabel: 'Civic',
    emoji: '📢',
    title: 'Election Campaign Period',
    subtitle:
      'Candidates and parties campaign to persuade voters. This is the most visible phase, governed strictly by the Model Code of Conduct.',
    sections: [
      {
        title: 'Permitted Campaign Activities',
        items: [
          'Public rallies with prior permission from local authorities',
          'Door-to-door canvassing without loudspeakers after 10 PM',
          'Newspaper, TV, and digital advertisements with MCMC pre-certification',
          'Social media campaigns with disclosure of expenditure',
        ],
      },
      {
        title: 'Campaign Spending Limits',
        items: [
          '₹95 lakh per candidate in large states (Lok Sabha)',
          '₹40 lakh per candidate in smaller states',
          'All expenditure must be maintained in a dedicated account',
          'Expenditure observers track real-time spending',
        ],
      },
    ],
    chips: ['₹95 Lakh Limit', 'MCMC Ad Cert', 'Expenditure Observer', 'Flying Squads'],
  },
  {
    id: 8,
    name: 'Polling Day',
    meta: 'D-Day · Voting Process',
    tag: 'key',
    tagLabel: 'Key',
    emoji: '🗳️',
    title: 'Polling Day — Casting Your Vote',
    subtitle:
      'The most important day of democracy! Eligible voters cast their vote using Electronic Voting Machines (EVMs) at their designated polling booths.',
    sections: [
      {
        title: 'How to Vote (Step by Step)',
        items: [
          'Carry valid photo ID (Voter ID, Aadhaar, Passport, etc.)',
          'Go to your designated polling booth (find it on voterportal.eci.gov.in)',
          'Your name is verified against the electoral roll — you sign/thumb impression',
          'Indelible ink is applied on your left index finger',
          'Press the button against your candidate on the EVM',
          'A paper slip (VVPAT) shows your vote for 7 seconds for verification',
        ],
      },
      {
        title: 'Voter Rights on Polling Day',
        items: [
          "Right to cast a 'NOTA' vote (None of the Above)",
          'Right to challenge a vote if your identity is fraudulently used',
          'Right to assistance if you are disabled or illiterate',
          'Polls are open 7 AM to 6 PM (varies by state)',
        ],
      },
    ],
    chips: ['EVM', 'VVPAT', 'NOTA', 'Indelible Ink', '7 AM – 6 PM'],
  },
  {
    id: 9,
    name: 'Vote Counting',
    meta: 'Count Day · Results',
    tag: 'official',
    tagLabel: 'Official',
    emoji: '🔢',
    title: 'Vote Counting Day',
    subtitle:
      'All EVMs are transported to counting centres under heavy security. Counting happens in rounds, observed by agents of each candidate.',
    sections: [
      {
        title: 'Counting Process',
        items: [
          'Postal ballots (ETPBS) are counted first',
          'EVM results are then tallied round by round',
          'Each table has agents of contesting candidates as witnesses',
          'Returning Officer declares results after all rounds',
          'VVPAT slip counting in 5 randomly selected EVMs per constituency',
        ],
      },
      {
        title: 'Security Measures',
        items: [
          'EVMs are stored in strongrooms with multi-layered security',
          'CCTV monitoring 24/7 until counting day',
          'Candidates can apply for re-counting by writing to RO',
          'Results uploaded on ECI website in real-time',
        ],
      },
    ],
    chips: ['Strongroom', 'Postal Ballot', 'ETPBS', 'VVPAT Verification'],
  },
  {
    id: 10,
    name: 'Declaration of Results',
    meta: 'Final Step · Democratic Outcome',
    tag: 'key',
    tagLabel: 'Key',
    emoji: '🏆',
    title: 'Declaration of Results & Government Formation',
    subtitle:
      'The winning candidate is declared, receives their certificate, and ultimately a new government is formed through the constitutional process.',
    sections: [
      {
        title: 'After Results',
        items: [
          'Winning candidate receives election certificate from RO',
          "Losing candidates' security deposits are forfeited if votes < 1/6 of valid votes",
          'The party/alliance with majority (272+ seats) is invited to form government',
          'President invites the majority leader to take oath as Prime Minister',
        ],
      },
      {
        title: 'Election Petitions',
        items: [
          'Losing candidates can challenge results in High Court (Election Petition)',
          'Must be filed within 45 days of declaration',
          'Grounds: corrupt practices, disqualification, irregularities',
        ],
      },
    ],
    chips: ['Election Certificate', 'Government Formation', '272 Majority', 'Election Petition'],
  },
];

export const INITIAL_QUIZ = [
  {
    q: 'What is the minimum age to vote in India?',
    opts: ['16 years', '18 years', '21 years', '25 years'],
    ans: 1,
    exp: 'The 61st Amendment (1988) lowered the voting age from 21 to 18 years, allowing millions of young citizens to participate in democracy.',
  },
  {
    q: 'NOTA stands for:',
    opts: [
      'No Option To Abstain',
      'None of the Above',
      'National Obligation To Abstain',
      'Not On The Agenda',
    ],
    ans: 1,
    exp: 'NOTA (None of the Above) was introduced in 2013 by the Supreme Court order, allowing voters to reject all candidates without abstaining.',
  },
  {
    q: 'What does VVPAT stand for?',
    opts: [
      'Voter Verified Paper Audit Trail',
      'Vote Verification and Polling Audit Terminal',
      'Verified Voting Paper Audit Technology',
      'Voter Verified Public Audit Trail',
    ],
    ans: 0,
    exp: 'VVPAT is a paper receipt printed by the EVM showing the voter which candidate their vote was cast for. It is visible for 7 seconds.',
  },
  {
    q: 'The Model Code of Conduct comes into effect:',
    opts: [
      'One week before polling',
      'On the day of polling',
      'Immediately when ECI announces the election schedule',
      'After nominations close',
    ],
    ans: 2,
    exp: 'The MCC becomes effective the moment ECI announces the election schedule, placing restrictions on governments and candidates.',
  },
  {
    q: 'What is the security deposit for a Lok Sabha candidate (General category)?',
    opts: ['₹10,000', '₹25,000', '₹50,000', '₹1,00,000'],
    ans: 1,
    exp: 'A General category candidate must deposit ₹25,000 (₹12,500 for SC/ST candidates) while filing nominations. This is forfeited if they get less than 1/6 of valid votes.',
  },
  {
    q: 'Which app can citizens use to report election MCC violations?',
    opts: ['UMANG App', 'DigiLocker', 'C-Vigil App', 'Aarogya Setu'],
    ans: 2,
    exp: 'The C-Vigil App by ECI allows citizens to report MCC violations with photo/video evidence. Teams respond within 100 minutes.',
  },
  {
    q: 'How many Lok Sabha seats are needed for a majority?',
    opts: ['250', '272', '300', '321'],
    ans: 1,
    exp: 'The Lok Sabha has 543 seats. A party/alliance needs 272 seats (simple majority = 50% + 1) to form a government independently.',
  },
  {
    q: 'EVMs were first used in all constituencies in which Indian General Election?',
    opts: ['1999', '2004', '2009', '2014'],
    ans: 1,
    exp: 'Electronic Voting Machines were used across all constituencies in India for the first time in the 2004 General Elections (14th Lok Sabha).',
  },
];

export const INITIAL_GLOSSARY = [
  {
    term: 'ECI',
    def: 'Election Commission of India — the independent constitutional body responsible for conducting elections across India.',
    badge: 'tag-official',
    badgeLabel: 'Regulatory',
  },
  {
    term: 'EPIC',
    def: "Elector's Photo Identity Card — commonly known as the Voter ID card, issued by ECI for voter identification.",
    badge: 'tag-civic',
    badgeLabel: 'Civic',
  },
  {
    term: 'MCC',
    def: 'Model Code of Conduct — guidelines issued by ECI to ensure free and fair elections, binding from announcement to results.',
    badge: 'tag-legal',
    badgeLabel: 'Legal',
  },
  {
    term: 'EVM',
    def: 'Electronic Voting Machine — an electronic device used in India to record votes. It consists of a Control Unit and a Balloting Unit.',
    badge: 'tag-key',
    badgeLabel: 'Technology',
  },
  {
    term: 'VVPAT',
    def: 'Voter Verified Paper Audit Trail — a printer attached to the EVM that produces a paper slip confirming the vote cast, visible for 7 seconds.',
    badge: 'tag-key',
    badgeLabel: 'Technology',
  },
  {
    term: 'NOTA',
    def: 'None of the Above — an option on the EVM allowing voters to reject all candidates without abstaining from voting.',
    badge: 'tag-civic',
    badgeLabel: 'Voter Right',
  },
  {
    term: 'Returning Officer',
    def: 'A government officer appointed by ECI to oversee elections in a constituency, from accepting nominations to declaring results.',
    badge: 'tag-official',
    badgeLabel: 'Official',
  },
  {
    term: 'Constituency',
    def: 'A defined geographical area from which voters elect a representative to the Lok Sabha or state legislature.',
    badge: 'tag-official',
    badgeLabel: 'Geography',
  },
  {
    term: 'Affidavit',
    def: 'A sworn statement by candidates declaring criminal antecedents, assets, liabilities, and educational qualifications.',
    badge: 'tag-legal',
    badgeLabel: 'Legal',
  },
  {
    term: 'Postal Ballot',
    def: 'A system allowing certain categories of voters (armed forces, overseas electors, police, etc.) to vote by post.',
    badge: 'tag-civic',
    badgeLabel: 'Mechanism',
  },
  {
    term: 'ETPBS',
    def: 'Electronically Transmitted Postal Ballot System — allows service voters to receive and return ballots electronically.',
    badge: 'tag-key',
    badgeLabel: 'Technology',
  },
  {
    term: 'C-Vigil App',
    def: 'A mobile app by ECI allowing citizens to report MCC violations with photo/video evidence. Response time is 100 minutes.',
    badge: 'tag-official',
    badgeLabel: 'Tool',
  },
  {
    term: 'Observer',
    def: 'An IAS/IPS officer appointed by ECI to an independent observer of election activities and expenditure in a constituency.',
    badge: 'tag-official',
    badgeLabel: 'Watchdog',
  },
  {
    term: 'NOTA',
    def: 'None of the Above — introduced in 2013 via Supreme Court order, it lets voters express disapproval of all candidates.',
    badge: 'tag-civic',
    badgeLabel: 'Right',
  },
  {
    term: 'Delimitation',
    def: 'The process of redrawing constituency boundaries based on population data from the Census.',
    badge: 'tag-legal',
    badgeLabel: 'Process',
  },
  {
    term: 'Booth Capturing',
    def: 'A criminal offence where persons illegally take over a polling booth and cast fraudulent votes. Punishable by 1–3 years imprisonment.',
    badge: 'tag-legal',
    badgeLabel: 'Offence',
  },
];

export const INITIAL_TRACKER = [
  {
    id: 1,
    task: 'Check if name is in Electoral Roll (voters.eci.gov.in)',
    completed: false,
    tip: 'Check using your EPIC number or name details.',
  },
  {
    id: 2,
    task: 'Locate my Polling Station',
    completed: false,
    tip: 'Use the Voter Helpline App to find your exact booth.',
  },
  {
    id: 3,
    task: 'Confirm Polling Date for my Constituency',
    completed: false,
    tip: 'Elections are held in phases; check your specific date.',
  },
  {
    id: 4,
    task: 'Prepare valid Photo ID',
    completed: false,
    tip: 'EPIC card is best, but Aadhaar, DL, or Passport also work.',
  },
  {
    id: 5,
    task: 'Know the Candidates',
    completed: false,
    tip: 'Read candidate affidavits on the ECI KYC app.',
  },
  {
    id: 6,
    task: 'Cast my Vote on Polling Day',
    completed: false,
    tip: 'Polls usually open at 7 AM. Go early to avoid queues!',
  },
];

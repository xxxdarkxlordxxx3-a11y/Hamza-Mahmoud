import { AssetIcon, CashflowIcon, LearnIcon, RiskIcon, WorkIcon, TaxIcon } from '../components/IconComponents';
import React from 'react';
import type { QuizQuestion } from '../types';

const icons = {
    asset: React.createElement(AssetIcon),
    work: React.createElement(WorkIcon),
    learn: React.createElement(LearnIcon),
    cashflow: React.createElement(CashflowIcon),
    risk: React.createElement(RiskIcon),
    tax: React.createElement(TaxIcon),
};

const fallbackQuizEn: QuizQuestion[] = [
    {
      question: "When you receive an unexpected bonus, your first thought is to:",
      options: [
        { text: "Plan a vacation or buy a new gadget.", mindset: 'poor' },
        { text: "Allocate it to your investment portfolio or pay down high-interest debt.", mindset: 'rich' },
        { text: "Put half in savings and spend the other half on something fun.", mindset: 'balanced' },
        { text: "Use it to pay off some bills.", mindset: 'balanced' }
      ],
      feedback: "A rich mindset prioritizes using extra funds to build assets or reduce liabilities, accelerating the path to financial freedom. A poor mindset often sees it as 'found money' for immediate gratification."
    },
    {
      question: "You view your primary job as:",
      options: [
        { text: "The ultimate source of security and your main financial tool.", mindset: 'poor' },
        { text: "A temporary source of capital to fund your asset-building.", mindset: 'rich' },
        { text: "A necessary part of life to pay the bills and save for retirement.", mindset: 'balanced' },
        { text: "A career path to climb for a higher salary and better benefits.", mindset: 'balanced' }
      ],
      feedback: "The rich understand that true security comes from owning income-generating assets, not from a paycheck that can disappear. A job is a means to an end: acquiring assets."
    },
    {
      question: "How do you define an 'asset'?",
      options: [
        { text: "Something you own that has value, like your house or car.", mindset: 'poor' },
        { text: "Something that puts money into your pocket, regardless of whether you work.", mindset: 'rich' },
        { text: "An investment that will hopefully grow in value over time, like stocks.", mindset: 'balanced' },
        { text: "Your savings account and retirement fund.", mindset: 'balanced' }
      ],
      feedback: "This is a core 'Rich Dad' principle. A house you live in or a car you drive are liabilities because they take money out of your pocket through expenses. An asset generates income."
    },
    {
        question: "When it comes to financial risk, you:",
        options: [
          { text: "Avoid it at all costs, preferring to keep money safe in a savings account.", mindset: 'poor' },
          { text: "Manage it through education and calculated decisions, understanding it's necessary for growth.", mindset: 'rich' },
          { text: "Only take risks with a small amount of 'play money'.", mindset: 'balanced' },
          { text: "Invest only in 'guaranteed' products recommended by a bank.", mindset: 'balanced' }
        ],
        feedback: "The poor see investing as risky and saving as safe. The rich understand that inflation makes saving risky and that true financial risk comes from a lack of knowledge."
      },
      {
        question: "The stock market has a major crash. You:",
        options: [
          { text: "Sell your investments to prevent further losses.", mindset: 'poor' },
          { text: "See it as a buying opportunity, as quality assets are now on sale.", mindset: 'rich' },
          { text: "Worry, but hold on to your investments hoping they recover.", mindset: 'balanced' },
          { text: "Stop investing any new money until things feel 'safer'.", mindset: 'balanced' }
        ],
        feedback: "The poor are driven by fear and sell low. The rich are guided by logic and fundamentals, understanding that market downturns are the best times to buy and build long-term wealth."
      }
];
  
const fallbackQuizAr: QuizQuestion[] = [
    {
      question: "عندما تتلقى مكافأة غير متوقعة، فإن أول ما يتبادر إلى ذهنك هو:",
      options: [
        { text: "التخطيط لإجازة أو شراء جهاز جديد.", mindset: 'poor' },
        { text: "تخصيصها لمحفظتك الاستثمارية أو سداد الديون ذات الفائدة المرتفعة.", mindset: 'rich' },
        { text: "وضع نصفها في المدخرات وإنفاق النصف الآخر على شيء ممتع.", mindset: 'balanced' },
        { text: "استخدامها لدفع بعض الفواتير.", mindset: 'balanced' }
      ],
      feedback: "عقلية الغني تعطي الأولوية لاستخدام الأموال الإضافية لبناء الأصول أو تقليل الخصوم، مما يسرّع الطريق إلى الحرية المالية. أما عقلية الفقير فغالبًا ما تراها 'أموالاً تم العثور عليها' للإشباع الفوري."
    },
    {
      question: "أنت تنظر إلى وظيفتك الأساسية على أنها:",
      options: [
        { text: "المصدر النهائي للأمان وأداتك المالية الرئيسية.", mindset: 'poor' },
        { text: "مصدر مؤقت لرأس المال لتمويل بناء الأصول الخاصة بك.", mindset: 'rich' },
        { text: "جزء ضروري من الحياة لدفع الفواتير والادخار للتقاعد.", mindset: 'balanced' },
        { text: "مسار وظيفي للترقي من أجل راتب أعلى ومزايا أفضل.", mindset: 'balanced' }
      ],
      feedback: "الأثرياء يدركون أن الأمان الحقيقي يأتي من امتلاك أصول مدرة للدخل، وليس من راتب يمكن أن يختفي. الوظيفة هي وسيلة لتحقيق غاية: حيازة الأصول."
    },
    {
      question: "كيف تعرّف 'الأصل'؟",
      options: [
        { text: "شيء تملكه وله قيمة، مثل منزلك أو سيارتك.", mindset: 'poor' },
        { text: "شيء يضع المال في جيبك، بغض النظر عما إذا كنت تعمل أم لا.", mindset: 'rich' },
        { text: "استثمار نأمل أن تنمو قيمته بمرور الوقت، مثل الأسهم.", mindset: 'balanced' },
        { text: "حساب التوفير الخاص بك وصندوق التقاعد.", mindset: 'balanced' }
      ],
      feedback: "هذا مبدأ أساسي من 'الأب الغني'. المنزل الذي تعيش فيه أو السيارة التي تقودها هي خصوم لأنها تخرج المال من جيبك من خلال النفقات. الأصل يدر دخلاً."
    },
    {
        question: "عندما يتعلق الأمر بالمخاطر المالية، فإنك:",
        options: [
          { text: "تتجنبها بأي ثمن، مفضلاً الاحتفاظ بالمال بأمان في حساب توفير.", mindset: 'poor' },
          { text: "تديرها من خلال التعليم والقرارات المحسوبة، مدركًا أنها ضرورية للنمو.", mindset: 'rich' },
          { text: "تخاطر فقط بمبلغ صغير من 'أموال اللعب'.", mindset: 'balanced' },
          { text: "تستثمر فقط في المنتجات 'المضمونة' التي يوصي بها البنك.", mindset: 'balanced' }
        ],
        feedback: "الفقراء يرون الاستثمار محفوفًا بالمخاطر والادخار آمنًا. الأثرياء يدركون أن التضخم يجعل الادخار محفوفًا بالمخاطر وأن المخاطر المالية الحقيقية تأتي من نقص المعرفة."
    },
    {
        question: "سوق الأسهم يشهد انهيارًا كبيرًا. أنت:",
        options: [
          { text: "تبيع استثماراتك لمنع المزيد من الخسائر.", mindset: 'poor' },
          { text: "تراها فرصة للشراء، حيث أن الأصول الجيدة معروضة للبيع الآن.", mindset: 'rich' },
          { text: "تقلق، لكنك تتمسك باستثماراتك على أمل أن تتعافى.", mindset: 'balanced' },
          { text: "تتوقف عن استثمار أي أموال جديدة حتى تشعر بأن الأمور 'أكثر أمانًا'.", mindset: 'balanced' }
        ],
        feedback: "الفقراء مدفوعون بالخوف ويبيعون بسعر منخفض. يسترشد الأثرياء بالمنطق والأساسيات، ويدركون أن فترات الركود في السوق هي أفضل الأوقات للشراء وبناء ثروة طويلة الأجل."
    }
];

export const systemInstructions = {
    en: `You are a serious and knowledgeable financial analyst and educator. Your primary goal is to explain core financial principles, using 'Rich Dad Poor Dad' as a foundational framework, but not your only source.
- Ground your explanations in core financial principles like the distinction between assets and liabilities, cash flow, financial intelligence, and making money work for you.
- While 'Rich Dad Poor Dad' is your main reference, you MUST incorporate information and examples from other sources, including real-world events, Wikipedia, and the strategies of modern investors (e.g., Warren Buffett, Ray Dalio, etc.) to provide a comprehensive and practical perspective.
- Avoid relying solely on the fictional "Rich Dad" character for examples.
- Maintain a professional, serious, and authoritative tone. Avoid overly enthusiastic or casual language.
- Strictly provide educational information and principles. Do not give personalized financial advice.
- Deliver concise, well-structured, and insightful answers.
- If asked about topics outside of finance, gently steer the conversation back to financial principles and investing education.`,
    ar: `أنت محلل مالي ومُعلم خبير وجاد. هدفك الأساسي هو شرح المبادئ المالية الجوهرية، مستخدماً كتاب 'الأب الغني والأب الفقير' كإطار عمل أساسي، ولكن ليس كمصدرك الوحيد.
- أسس شروحاتك على المبادئ المالية الأساسية مثل التمييز بين الأصول والخصوم، أهمية التدفق النقدي، الذكاء المالي، وجعل المال يعمل لصالحك.
- بينما يعتبر كتاب 'الأب الغني والأب الفقير' مرجعك الرئيسي، يجب عليك دمج معلومات وأمثلة من مصادر أخرى، بما في ذلك الأحداث الواقعية، ويكيبيديا، واستراتيجيات المستثمرين المعاصرين (مثل وارن بافيت، راي داليو، وغيرهم) لتقديم منظور شامل وعملي.
- تجنب الاعتماد فقط على شخصية "الأب الغني" الخيالية كمرجع للأمثلة.
- حافظ على نبرة مهنية، جادة، وذات مصداقية. تجنب اللغة الحماسية المفرطة أو غير الرسمية.
- قدم معلومات ومبادئ تعليمية بحتة. لا تقدم أي نصائح مالية شخصية.
- قدم إجابات موجزة، منظمة، وعميقة.
- إذا سُئلت عن مواضيع خارج نطاق التمويل، أعد توجيه المحادثة بلباقة نحو المبادئ المالية والتعليم الاستثماري.`,
}

export const translations = {
  en: {
    ui: {
        title: "Rich Mindset",
        subtitle: 'Explore Financial Philosophies & Test Your Mindset',
        poorMindset: "Poor Mindset",
        richMindset: "Rich Mindset",
        chatTitle: "AI Financial Mentor",
        chatGreeting: "Hello! Ask me anything about the 'Rich Dad Poor Dad' philosophy.",
        chatPlaceholder: "Ask a question...",
        exploreConcepts: "Explore Core Concepts",
        coreConcepts: "Core Concepts",
        takeTheQuiz: "Take The Mindset Quiz",
        quizTitle: "Mindset Assessment",
        quizIntro: "Discover your financial mindset. This AI-powered assessment will reveal whether you think like the rich, the poor, or somewhere in between.",
        generatingQuiz: "Generating your personalized quiz...",
        quizGenerationError: "Could not generate AI questions. Using fallback questions.",
        question: "Question",
        of: "of",
        next: "Next",
        back: "Back",
        finish: "Finish",
        resultsTitle: "Your Mindset Analysis",
        resultsIntro: "You have a mindset that's leaning towards",
        richMindsetResult: "a Rich Mindset!",
        poorMindsetResult: "a Poor Mindset.",
        balancedMindsetResult: "a Balanced Mindset.",
        resultsSubtitle: "Areas for Mindset Growth",
        resultsExplanation: "Below are the questions where your choices aligned with a 'Poor' or 'Balanced' Mindset. Understanding these is the first step toward financial growth.",
        yourAnswer: "Your Answer",
        richDadAlternative: "The Rich Mindset Alternative",
        retakeQuiz: "Retake Quiz",
    },
    concepts: [
        {
          icon: icons.asset,
          title: "Assets vs. Liabilities",
          poorMindset: "Sees their primary residence as their biggest asset and accumulates liabilities like cars and debts, thinking they are assets.",
          richMindset: "Focuses on acquiring income-generating assets like real estate, stocks, and businesses. Understands an asset puts money in their pocket."
        },
        {
          icon: icons.work,
          title: "How They Work",
          poorMindset: "Works hard for money. Trades time for a paycheck. The 'Rat Race' mentality: get a safe, secure job and climb the corporate ladder.",
          richMindset: "Has money work hard for them. Creates or invests in systems and assets that generate passive income, freeing up their time."
        },
        {
          icon: icons.learn,
          title: "Financial Education",
          poorMindset: "Believes formal education (school) is the key to success and often stops learning about money after graduation.",
          richMindset: "Pursues lifelong financial literacy. Continuously learns about investing, markets, and money management outside of traditional schooling."
        },
        {
          icon: icons.cashflow,
          title: "Focus on Income vs. Cashflow",
          poorMindset: "Focuses on the income statement (salary). A higher salary is the main goal, but it often leads to higher expenses.",
          richMindset: "Focuses on the balance sheet (assets vs. liabilities) and generating cash flow from assets to cover expenses."
        },
        {
          icon: icons.risk,
          title: "View on Risk",
          poorMindset: "Views investing as risky and something to be avoided. Prefers to save money in a bank, where it loses value to inflation.",
          richMindset: "Understands that not investing is riskier. Manages risk through knowledge and education rather than avoiding it altogether."
        },
        {
            icon: icons.tax,
            title: "Understanding Taxes",
            poorMindset: "Sees taxes as a penalty for earning more. They work for a salary, get taxed heavily, and have little left to invest.",
            richMindset: "Views the tax code as a set of incentives. Uses corporations (B and I quadrant) to legally pay less tax and accelerate wealth creation."
        }
    ],
    quiz: fallbackQuizEn,
  },
  ar: {
    ui: {
        title: "عقلية الغني",
        subtitle: 'استكشف الفلسفات المالية واختبر عقليتك',
        poorMindset: "عقلية الفقراء",
        richMindset: "عقلية الأثرياء",
        chatTitle: "مرشدك المالي الذكي",
        chatGreeting: "أهلاً بك! أنا مرشدك المالي. اسألني أي شيء عن استراتيجيات بناء الثروة من كتاب 'الأب الغني والأب الفقير'.",
        chatPlaceholder: "اكتب سؤالك هنا...",
        exploreConcepts: "استكشف المبادئ الأساسية",
        coreConcepts: "المبادئ الأساسية",
        takeTheQuiz: "ابدأ اختبار العقلية",
        quizTitle: "تقييم العقلية",
        quizIntro: "اكتشف عقليتك المالية. هذا التقييم المدعوم بالذكاء الاصطناعي سيكشف ما إذا كنت تفكر مثل الأغنياء أو الفقراء أو في مكان ما بينهما.",
        generatingQuiz: "جاري إنشاء اختبارك المخصص...",
        quizGenerationError: "تعذر إنشاء أسئلة الذكاء الاصطناعي. سيتم استخدام الأسئلة الاحتياطية.",
        question: "سؤال",
        of: "من",
        next: "التالي",
        back: "السابق",
        finish: "إنهاء",
        resultsTitle: "تحليل عقليتك",
        resultsIntro: "لديك عقلية تميل نحو",
        richMindsetResult: "عقلية الغني!",
        poorMindsetResult: "عقلية الفقير.",
        balancedMindsetResult: "عقلية متوازنة.",
        resultsSubtitle: "مجالات لتنمية عقليتك",
        resultsExplanation: "فيما يلي الأسئلة التي توافقت فيها اختياراتك مع 'عقلية الفقير' أو 'العقلية المتوازنة'. فهم هذه النقاط هو الخطوة الأولى نحو النمو المالي.",
        yourAnswer: "إجابتك",
        richDadAlternative: "بديل عقلية الغني",
        retakeQuiz: "إعادة الاختبار",
    },
    concepts: [
        {
          icon: icons.asset,
          title: "الأصول مقابل الخصوم",
          poorMindset: "يرى أن منزله السكني هو أصلهُ الأثمن، بينما يغرق في تراكم الخصوم كالسيارات الفارهة والديون، معتقداً أنها استثمارات.",
          richMindset: "يركز على بناء محفظة من الأصول المدرة للدخل كالعقارات الاستثمارية والأسهم. يدرك أن الأصل الحقيقي هو ما يضع المال في جيبك."
        },
        {
          icon: icons.work,
          title: "لمن يعملون: للمال أم المال لهم؟",
          poorMindset: "يعمل بجد مقابل راتب شهري، مقايضاً وقته الثمين بالمال. يعيش في 'سباق الفئران' بحثاً عن الأمان الوظيفي والترقيات.",
          richMindset: "يجعل المال يعمل بجد من أجله. يستثمر في أنظمة وأصول تولد تدفقات نقدية، مما يمنحه حرية الوقت والقرار."
        },
        {
          icon: icons.learn,
          title: "التعليم المالي المستمر",
          poorMindset: "يعتقد أن الشهادة الجامعية هي تذكرته للنجاح، ويتوقف عن التعلم في الشؤون المالية بمجرد التخرج.",
          richMindset: "يسعى للمعرفة المالية طوال حياته. لا يتوقف عن دراسة الاستثمار والأسواق وفنون إدارة الأموال خارج أسوار التعليم التقليدي."
        },
        {
          icon: icons.cashflow,
          title: "الدخل الوظيفي أم التدفق النقدي؟",
          poorMindset: "كل تركيزه منصب على زيادة راتبه. الراتب الأعلى هو غايته، لكنه غالباً ما يؤدي إلى نمط حياة أكثر تكلفة وديون أكبر.",
          richMindset: "يركز على الميزانية العمومية، ويهدف لزيادة أصوله. يسعى لتوليد تدفق نقدي من أصوله يغطي كافة نفقاته ويزيد."
        },
        {
          icon: icons.risk,
          title: "فلسفة التعامل مع المخاطر",
          poorMindset: "يتحاشى الاستثمار ويعتبره ضرباً من المقامرة. يفضل تكديس أمواله في البنك، حيث تتآكل قيمتها بفعل التضخم.",
          richMindset: "يدرك أن الخطر الأكبر هو الجهل المالي. يدير المخاطر من خلال التعلم والتحليل الدقيق، لا عن طريق تجنب الفرص."
        },
        {
            icon: icons.tax,
            title: "فهم الضرائب",
            poorMindset: "يرى الضرائب كعقوبة على كسب المزيد. يعمل مقابل راتب، يُقتطع منه ضرائب باهظة، ولا يتبقى له سوى القليل للاستثمار.",
            richMindset: "ينظر إلى قانون الضرائب كمجموعة من الحوافز. يستخدم الشركات (في ربعي B و I) لدفع ضرائب أقل بشكل قانوني وتسريع عملية بناء الثروة."
        }
      ],
      quiz: fallbackQuizAr,
  }
};

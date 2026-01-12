export type FaqItem = {
  q: string;
  a: string;
};

export type Lang = "fr" | "ar" | "en";

export const FAQS: Record<Lang, FaqItem[]> = {
  fr: [
    {
      q: "Qu’est-ce que l’association 8 Kanoon et quelle est sa mission ?",
      a: "8 Kanoon est une association éducative fondée en 2025. Nous soutenons les enfants syriens (6–12 ans) par l’éducation, la lecture et des activités culturelles, afin de renforcer l’identité et de créer des ponts entre la Syrie et la France.",
    },
    {
      q: "À qui s’adressent vos activités éducatives pour enfants syriens ?",
      a: "Nos programmes s’adressent principalement aux enfants syriens âgés de 6 à 12 ans, en Syrie et dans la diaspora. Nous proposons des activités éducatives, ateliers, jeux pédagogiques et contenus culturels adaptés à l’enfance.",
    },
    {
      q: "Où 8 Kanoon met-elle en œuvre ses actions (Syrie, Europe, France) ?",
      a: "À ce jour, nos activités ont été mises en œuvre en Syrie. Nous préparons un déploiement progressif en Europe, avec un focus particulier sur la France, à travers des événements éducatifs et culturels.",
    },
    {
      q: "Comment devenir partenaire d’une association éducative comme 8 Kanoon ?",
      a: "Vous pouvez devenir partenaire en proposant un soutien financier, technique ou logistique. Nous développons des partenariats en Syrie et en Europe pour renforcer l’impact éducatif et culturel auprès des enfants syriens.",
    },
    {
      q: "Comment faire du bénévolat avec 8 Kanoon ?",
      a: "Le bénévolat peut concerner la création de contenus, l’animation d’ateliers, la communication ou le soutien aux événements. Contactez-nous via la page Contact pour discuter de vos compétences et disponibilités.",
    },
    {
      q: "Publiez-vous un magazine pour enfants et comment y accéder ?",
      a: "8 Kanoon édite un magazine éducatif pour enfants. Sur ce site vitrine, les éditions ne sont pas affichées ni téléchargeables. Pour en savoir plus, contactez-nous ou suivez nos réseaux sociaux.",
    },
    {
      q: "Quels types d’ateliers et de supports pédagogiques proposez-vous ?",
      a: "Nous proposons des ateliers éducatifs, jeux coopératifs, activités de lecture et supports pédagogiques (numériques et papier). Les contenus sont conçus pour encourager l’apprentissage, la créativité et l’identité culturelle.",
    },
    {
      q: "Comment soutenir 8 Kanoon et ses projets éducatifs pour enfants ?",
      a: "Vous pouvez soutenir l’association via un partenariat, un don, du bénévolat ou la mise en relation avec des institutions. Chaque contribution aide à développer des actions éducatives pour les enfants syriens.",
    },
  ],

  en: [
    {
      q: "What is 8 Kanoon and what is your mission?",
      a: "8 Kanoon is an educational association founded in 2025. We support Syrian children (ages 6–12) through education, reading, and cultural activities, building bridges between Syrian and French communities.",
    },
    {
      q: "Who are your educational activities for?",
      a: "Our programs primarily serve Syrian children aged 6–12 in Syria and diaspora communities. We provide educational activities, workshops, learning games, and cultural content designed for children.",
    },
    {
      q: "Where does 8 Kanoon operate (Syria, Europe, France)?",
      a: "So far, our activities have been implemented in Syria. We are preparing a gradual expansion to Europe, with a specific focus on France, through educational and cultural events.",
    },
    {
      q: "How can an organization partner with 8 Kanoon?",
      a: "Partners can support us financially, technically, or operationally. We collaborate with partners in Syria and Europe to strengthen educational impact for Syrian children.",
    },
    {
      q: "How can I volunteer with 8 Kanoon?",
      a: "Volunteering can include content creation, workshop support, communications, or events. Reach out through the Contact page to share your skills and availability.",
    },
    {
      q: "Do you publish a children’s magazine and how can we access it?",
      a: "We publish an educational magazine for children. This website is a showcase site, so editions are not displayed or downloadable here. Contact us or follow our social media for updates.",
    },
    {
      q: "What types of workshops and educational resources do you provide?",
      a: "We provide educational workshops, cooperative games, reading activities, and learning resources (digital and paper), designed to support learning, creativity, and cultural identity.",
    },
    {
      q: "How can I support your educational projects for children?",
      a: "You can support 8 Kanoon through partnerships, donations, volunteering, or introductions to institutions. Every contribution helps expand educational opportunities for Syrian children.",
    },
  ],

  ar: [
    {
      q: "ما هي جمعية 8 كانون وما هي رسالتها التعليمية؟",
      a: "جمعية 8 كانون جمعية تعليمية تأسست عام 2025، تدعم الأطفال السوريين (6–12 سنة) عبر التعليم والقراءة والأنشطة الثقافية، وبناء جسور بين المجتمعين السوري والفرنسي.",
    },
    {
      q: "من هم الأطفال المستفيدون من أنشطة 8 كانون التعليمية؟",
      a: "نستهدف بشكل أساسي الأطفال السوريين من عمر 6 إلى 12 سنة داخل سوريا وفي مجتمعات الشتات، عبر أنشطة تعليمية وورشات وألعاب تربوية ومحتوى ثقافي مناسب للأطفال.",
    },
    {
      q: "أين تُنفّذ جمعية 8 كانون أنشطتها (سوريا/أوروبا/فرنسا)؟",
      a: "حتى الآن نُفّذت أنشطة الجمعية داخل سوريا، ونعمل على التحضير للتوسّع تدريجيًا في أوروبا، وبشكل خاص في فرنسا، عبر فعاليات تعليمية وثقافية.",
    },
    {
      q: "كيف يمكن أن تصبح جهة ما شريكًا لجمعية تعليمية مثل 8 كانون؟",
      a: "يمكن الشراكة عبر دعم مالي أو تقني أو لوجستي. لدينا شراكات في سوريا وأوروبا بهدف تعزيز الأثر التعليمي والثقافي للأطفال السوريين.",
    },
    {
      q: "كيف يمكنني التطوّع مع جمعية 8 كانون؟",
      a: "التطوع يمكن أن يشمل إعداد محتوى، دعم ورشات، تصميم، ترجمة، تواصل اجتماعي أو دعم فعاليات. تواصل معنا عبر صفحة التواصل لنتعرف على مهاراتك وتفرغك.",
    },
    {
      q: "هل تنشرون مجلة للأطفال وكيف يمكن الوصول لها؟",
      a: "نعم، ننشر مجلة تعليمية للأطفال. هذا الموقع هو موقع تعريفي (Vitrine)، لذلك لا يتم عرض الإصدارات أو تحميلها هنا. لمعرفة التفاصيل تابعنا على وسائل التواصل أو تواصل معنا.",
    },
    {
      q: "ما نوع الورشات والمواد التعليمية التي تقدمونها؟",
      a: "نقدم ورشات تعليمية، ألعابًا تعاونية، أنشطة قراءة، ومواد تربوية رقمية وورقية، بهدف دعم التعلم والإبداع وتعزيز الهوية الثقافية للأطفال.",
    },
    {
      q: "كيف يمكن دعم مشاريع 8 كانون التعليمية للأطفال؟",
      a: "يمكن دعم الجمعية عبر الشراكات، التبرع، التطوع، أو ربطنا بجهات ومؤسسات داعمة. كل دعم يساهم في توسيع الفرص التعليمية للأطفال السوريين.",
    },
  ],
};

export function getFaqs(lang: Lang): FaqItem[] {
  return FAQS[lang] ?? FAQS.fr;
}

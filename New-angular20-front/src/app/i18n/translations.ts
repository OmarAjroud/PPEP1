export const ALL_TRANSLATIONS = {
  ar: {
    dir: 'rtl',
    // Navbar
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      search: 'تكوينات',
      applications: 'ترشحاتي',
      profile: 'حسابي',
      login: 'تسجيل الدخول',
      logout: 'خروج',
      subtitle: {
        home: '',
        about: '',
        search: '',
        applications: '',
        profile: '',
      },
    },
    // Home Page (New)
    home: {
      welcome: 'مرحبًا بك',
      subtitle: 'فضاء المترشح للوكالة التونسية للتكوين المهني',
      cards: {
        offers: { title: 'العروض', subtitle: 'ابحث عن تكوين' },
        profile: { title: 'ملفي الشخصي', subtitle: 'إدارة بياناتي' },
        notifications: { title: 'الإشعارات', subtitle: 'عرض التنبيهات' },
        applications: { title: 'ترشحاتي', subtitle: 'متابعة الملفات' },
      },
    },
    // Landing Page
    landing: {
      heroTitle: 'ابنِ مستقبلك المهني',
      heroSubtitle: 'انضم إلى الوكالة التونسية للتكوين المهني واكتسب مهارات المستقبل',
      ctaSearch: 'ابحث عن تكوين',
      ctaRegister: 'التسجيل',
      // About Snapshot
      aboutTitle: 'من نحن',
      aboutMission: 'مهمتنا',
      aboutMissionDesc:
        'تنفيذ سياسة الدولة في مجال التكوين المهني الأساسي وتأهيل الشباب لسوق الشغل.',
      aboutVision: 'رؤيتنا',
      aboutVisionDesc: 'ضمان تكوين عالي الجودة يستجيب لحاجيات سوق العمل ويفتح آفاقاً للشباب.',
      // Features (4)
      whyTitle: 'لماذا تختار ATFP ؟',
      whySubtitle: 'تكوين ذو جودة لمسيرة مهنية ناجحة',
      features: [
        { title: 'شهادات معتمدة', desc: 'شهادات معترف بها من الدولة والمؤسسات.' },
        { title: 'تكوين تطبيقي', desc: 'تعلم بالممارسة مع معدات حديثة ومدربين خبراء.' },
        { title: 'شبكة واسعة', desc: 'أكثر من 136 مركز تكوين في كامل الجمهورية.' },
        { title: 'إدماج مهني', desc: 'مرافقة في البحث عن شغل وشراكة مع المؤسسات.' },
      ],
      // Stats (4)
      stats: {
        centers: 'مركز تكوين',
        specs: 'اختصاص',
        students: 'متكون سنوياً',
        sectors: 'قطاع مهني',
      },
      // How It Works
      howTitle: 'كيف يعمل ؟',
      howSubtitle: 'ثلاث خطوات بسيطة للبدء',
      steps: [
        { title: 'سجّل حسابك', desc: 'أنشئ حسابًا مجانيًا في بضع دقائق.', icon: 'person-plus' },
        {
          title: 'ابحث عن تكوين',
          desc: 'تصفح أكثر من 400 اختصاص واختر ما يناسبك.',
          icon: 'search',
        },
        { title: 'قدّم ترشحك', desc: 'أرسل ملفك واحصل على متابعة فورية.', icon: 'send-check' },
      ],
      // Sectors
      sectorsTitle: 'قطاعات التكوين',
      sectorsSubtitle: 'اكتشف مجالات التكوين المتنوعة',
      sectorsList: [
        { title: 'تكنولوجيا المعلومات', icon: 'pc-display' },
        { title: 'الميكانيك والكهرباء', icon: 'gear-wide-connected' },
        { title: 'البناء والأشغال العمومية', icon: 'building' },
        { title: 'الفلاحة والصناعات الغذائية', icon: 'tree' },
        { title: 'السياحة والفندقة', icon: 'cup-hot' },
        { title: 'النسيج والألبسة', icon: 'scissors' },
        { title: 'الصحة والجمال', icon: 'heart-pulse' },
        { title: 'الإدارة والتسيير', icon: 'briefcase' },
      ],
      // Testimonials
      testimonialsTitle: 'ماذا يقول متكونونا ؟',
      testimonialsSubtitle: 'قصص نجاح حقيقية',
      testimonials: [
        {
          name: 'أحمد بن سالم',
          role: 'خريج قسم المعلوماتية',
          quote: 'التكوين في ATFP غيّر حياتي المهنية. اليوم أعمل كمطور برمجيات.',
        },
        {
          name: 'فاطمة الزهراء',
          role: 'خريجة قسم التصميم',
          quote: 'المدربون كانوا ممتازين والمعدات حديثة. أنصح كل شاب بالتسجيل.',
        },
        {
          name: 'محمد العربي',
          role: 'خريج قسم الميكانيك',
          quote: 'بفضل التكوين التطبيقي، حصلت على شغل مباشرة بعد التخرج.',
        },
      ],
      // Final CTA
      finalCtaTitle: 'هل أنت جاهز للبداية ؟',
      finalCtaSubtitle: 'انضم إلى آلاف المتكونين الناجحين',
      finalCtaButton: 'تسجيل الدخول',
      // Enhanced Footer
      footerAbout:
        'الوكالة التونسية للتكوين المهني توفر تكوينًا عالي الجودة لتأهيل الشباب التونسي.',
      footerLinks: 'روابط سريعة',
      footerContact: 'اتصل بنا',
      footerAddress: 'تونس العاصمة، تونس',
      footerPhone: '+216 71 000 000',
      footerEmail: 'contact@atfp.tn',
    },
    // About Page
    about: {
      title: 'عن الوكالة',
      subtitle: 'الوكالة التونسية للتكوين المهني',
      missionTitle: 'مهمتنا',
      missionDesc:
        'تعمل الوكالة التونسية للتكوين المهني، تحت إشراف وزارة التشغيل والتكوين المهني، على تنفيذ سياسة الحكومة في مجال التكوين المهني الأساسي للشباب والعمال.',
      visionTitle: 'رؤيتنا',
      visionDesc:
        'ضمان تكوين ذو جودة عالية يستجيب لحاجيات سوق الشغل ويفتح آفاقاً واسعة للشباب في تونس والخارج.',
      statsTitle: 'أرقامنا',
      structureTitle: 'هيكلتنا',
      structureSubtitle: 'شبكة واسعة',
      structureDesc: 'تغطية وطنية مع مراكز موزعة على كامل تراب الجمهورية.',
      partnershipTitle: 'شراكة مع المؤسسات',
      partnershipDesc: 'شراكة وثيقة مع الشركات للتكوين بالتداول والتشغيل.',
      coopTitle: 'تعاون دولي',
      coopDesc: 'برامج تعاون مع شركاء دوليين.',
      creationDate: 'تاريخ التأسيس',
      sectors: 'قطاع مهني',
    },
    // ... (Previous Content)
    footer: {
      rights: '© 2026 الوكالة التونسية للتكوين المهني. جميع الحقوق محفوظة.',
    },
    // Login Page
    login: {
      title: 'تسجيل الدخول',
      subtitle: 'مرحباً بعودتك! الرجاء إدخال بياناتك.',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      loginButton: 'دخول',
      noAccount: 'ليس لديك حساب؟',
      registerLink: 'سجل الآن',
    },
    // User Dashboard
    dashboard: {
      title: 'لوحة القيادة',
      subtitle: 'مرحبًا بك في فضاء المترشح الخاص بك.',
      notifications: {
        title: 'الإشعارات',
        none: 'لا توجد إشعارات',
        unread: 'غير مقروءة',
        unreadPlural: 'غير مقروءة',
        allRead: 'الكل مقروء ✓',
        total: 'الإجمالي',
        refresh: 'تحديث',
        loading: 'جاري التحميل...',
        allUpToDate: 'كل شيء محدث!',
        emptySubtitle: 'ستتلقى هنا تحديثات ترشحاتك.',
        accepted: '✓ مقبولة',
        rejected: '✗ مرفوضة',
        info: 'معلومة',
        at: 'على الساعة',
      },
      quickActions: {
        title: 'الوصول السريع',
        search: 'البحث عن تكوين',
        searchSub: 'تصفح عروض التكوين المتاحة',
        apps: 'ترشحاتي',
        appsSub: 'متابعة ملفاتك',
        profile: 'تحديث الملف',
        profileSub: 'تعديل بياناتك',
      },
    },
    // Dashboard / Search
    search: {
      title: 'ابحث عن تكوين',
      subtitle: 'اكتشف فرص التكوين المتاحة وحقق طموحك المهني.',
      filters: {
        title: 'معايير البحث',
        level: 'المستوى الدراسي',
        diploma: 'الشهادة',
        specialty: 'الاختصاص',
        gov: 'الولاية',
        sector: 'القطاع',
        center: 'مركز التكوين',
        all: 'الكل',
        searchPlaceholder: 'بحث...',
      },
      buttons: {
        search: 'بحث',
        apply: 'ترشح',
      },
      results: {
        title: 'تكوين متاح',
        loading: 'جار البحث...',
        noResults: 'لا توجد نتائج.',
      },
      columns: {
        date: 'تاريخ البداية',
      },
      card: {
        duration: 'المدة',
        center: 'المركز',
        detailsButton: 'التفاصيل',
        applyButton: 'ترشح',
      },
    },
    // My Applications
    applications: {
      title: 'ترشحاتي',
      subtitle: 'تتبع حالة مطالب الترشح الخاصة بك.',
      status: {
        draft: 'مسودة',
        pending: 'في الانتظار',
        submitted: 'تم الإرسال',
        accepted: 'مقبول',
        rejected: 'مرفوض',
      },
      empty: 'لم تقم بأي ترشح بعد.',
      emptySubtitle: 'لم تترشح لأي تكوين بعد.',
      searchButton: 'ابحث عن تكوين',
      columns: {
        housing: 'مبيت',
        scholarship: 'منحة',
      },
      actions: {
        delete: 'حذف',
        confirm: 'تأكيد',
        printReceipt: 'طباعة الوصل',
      },
    },
    // Profile / Details
    profile: {
      title: 'الملف الشخصي',
      subtitle: 'إدارة معلوماتك الشخصية.',
      personalInfo: 'المعلومات الشخصية',
      contactInfo: 'بيانات الاتصال',
      birthInfo: 'بيانات الولادة',
      educationInfo: 'المسار الدراسي',
      credentials: 'بيانات الدخول',
      account: 'الحساب',
      verified: 'حساب موثق',
      labels: {
        name: 'الاسم واللقب',
        cin: 'رقم بطاقة التعريف',
        email: 'البريد الإلكتروني',
        currentEmail: 'البريد الإلكتروني الحالي',
        newEmail: 'البريد الإلكتروني الجديد',
        phone: 'الهاتف الجوال',
        telFixe: 'الهاتف القار',
        address: 'العنوان',
        postalCode: 'الترقيم البريدي',
        gouvernorat: 'الولاية',
        delegation: 'المعتمدية',
        municipalite: 'البلدية',
        birthDate: 'تاريخ الولادة',
        gender: 'الجنس',
        birthYear: 'سنة الولادة',
        birthCertNumber: 'رقم الترسيم بالولادة',
        etablissement: 'المؤسسة التعليمية',
        typeEtablissement: 'نوع المؤسسة',
        niveauScolaire: 'المستوى الدراسي',
        anneeAbandon: 'سنة الانقطاع',
      },
      actions: {
        edit: 'تعديل',
        editEmail: 'تعديل البريد',
        save: 'حفظ',
        update: 'تحديث',
        cancel: 'إلغاء',
      },
    },
    // Registration (Common labels)
    registration: {
      title: 'تسجيل جديد',
      subtitle: 'أنشئ حسابك للبدء في مسيرتك التكوينية.',
      steps: {
        personal: 'المعطيات الشخصية',
        birth: 'مضمون الولادة',
        contact: 'الاتصال',
        education: 'الدراسة',
      },
      buttons: {
        next: 'التالي',
        prev: 'السابق',
        submit: 'تسجيل',
      },
    },
    // Admin
    admin: {
      nav: {
        dashboard: 'لوحة القيادة',
        candidatures: 'الترشحات',
        offres: 'العروض',
        users: 'المستخدمون',
      },
      dashboard: {
        title: 'لوحة الإدارة',
        subtitle: 'نظرة عامة على المنظومة',
        users: 'المستخدمون',
        pending: 'قيد الانتظار',
        accepted: 'مقبولة',
        offres: 'العروض',
        manageCandidatures: 'إدارة ملفات الترشح',
        manageOffres: 'إدارة عروض التكوين',
        manageUsers: 'إدارة المستخدمين',
      },
      candidatures: {
        subtitle: 'إدارة جميع ملفات الترشح',
        all: 'الكل',
        candidate: 'المترشح',
        speciality: 'الاختصاص',
        center: 'المركز',
        statusCol: 'الحالة',
        empty: 'لا توجد ترشحات',
      },
      offres: {
        subtitle: 'إدارة عروض التكوين',
        create: 'إضافة عرض',
        edit: 'تعديل العرض',
        speciality: 'الاختصاص',
        center: 'المركز',
        diploma: 'الشهادة',
        startDate: 'بداية التكوين',
        endDate: 'نهاية التكوين',
        places: 'الأماكن',
        candidaturesCount: 'الترشحات',
        housing: 'إقامة',
        scholarship: 'منحة',
        empty: 'لا توجد عروض',
      },
      users: {
        subtitle: 'إدارة حسابات المستخدمين',
        name: 'الاسم',
        phone: 'الهاتف',
        role: 'الدور',
        candidaturesCount: 'ترشحات',
        empty: 'لا يوجد مستخدمون',
      },
      status: {
        pending: 'في الانتظار',
        accepted: 'مقبولة',
        rejected: 'مرفوضة',
        draft: 'مسودة',
      },
    },
    // Toasts & Confirmations
    toast: {
      auth: {
        loginSuccess: 'تم تسجيل الدخول بنجاح. مرحباً!',
        loginError: 'بيانات الدخول غير صحيحة أو هناك مشكلة في الاتصال.',
        noToken: 'تم تسجيل الدخول لكن لم يتم استلام رمز المرور.',
        logoutSuccess: 'تم تسجيل الخروج بنجاح.',
      },
      profile: {
        updateInfoSuccess: 'تم تحديث المعلومات بنجاح!',
        updateInfoError: 'حدث خطأ أثناء التحديث.',
        updateEmailSuccess: 'تم تحديث البريد الإلكتروني بنجاح!',
        updateEmailError: 'حدث خطأ أثناء تحديث البريد الإلكتروني.',
      },
      registration: {
        fileTooLarge: 'حجم الملف كبير جداً (الأقصى 2 ميغابايت)',
        formErrors: 'الرجاء التحقق من الأخطاء في الاستمارة (البريد الإلكتروني أو مضمون الولادة).',
        success: 'تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.',
        error: 'حدث خطأ أثناء التسجيل.',
      },
      offers: {
        applyConfirm: 'هل تريد الترشح لهذا العرض؟',
        applySuccess: 'تم الترشح بنجاح!',
        applyError: 'حدث خطأ أثناء الترشح.',
      },
      admin: {
        deleteUserConfirm: 'هل أنت متأكد من حذف هذا المستخدم وجميع ترشحاته؟',
        deleteUserSuccess: 'تم حذف المستخدم بنجاح.',
        deleteError: 'حدث خطأ أثناء الحذف.',
        saveError: 'حدث خطأ أثناء الحفظ.',
        offerUpdateSuccess: 'تم تحديث العرض بنجاح!',
        offerCreateSuccess: 'تم إنشاء العرض بنجاح!',
        deleteOfferConfirm: 'هل أنت متأكد من حذف هذا العرض؟',
        deleteOfferSuccess: 'تم حذف العرض بنجاح.',
        acceptCandidatureSuccess: 'تم قبول الترشح وإعلام المستخدم.',
        acceptCandidatureError: 'حدث خطأ أثناء القبول.',
        rejectCandidatureSuccess: 'تم رفض الترشح وإعلام المستخدم.',
        rejectCandidatureError: 'حدث خطأ أثناء الرفض.',
        deleteCandidatureConfirm: 'هل أنت متأكد من حذف هذا الترشح؟',
        deleteCandidatureSuccess: 'تم حذف الترشح بنجاح.',
      },
    },
  },
  fr: {
    dir: 'ltr',
    // Navbar (Existing)
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      search: 'Formations',
      applications: 'Mes Candidatures',
      profile: 'Mon Profil',
      login: 'Se Connecter',
      logout: 'Déconnexion',
      subtitle: {
        home: '',
        about: '',
        search: '',
        applications: '',
        profile: '',
      },
    },
    // Home Page (New)
    home: {
      welcome: 'Bienvenue',
      subtitle: 'Espace Candidat ATFP',
      cards: {
        offers: { title: 'Offres', subtitle: 'Trouver une formation' },
        profile: { title: 'Mon Profil', subtitle: 'Gérer mes informations' },
        notifications: { title: 'Notifications', subtitle: 'Voir les alertes' },
        applications: { title: 'Candidatures', subtitle: 'Suivi de dossiers' },
      },
    },
    // Landing (Expanded)
    landing: {
      heroTitle: 'Construisez votre avenir professionnel',
      heroSubtitle:
        "Rejoignez l'Agence Tunisienne de la Formation Professionnelle et maîtrisez un métier d'avenir.",
      ctaSearch: 'Trouver une Formation',
      ctaRegister: "S'inscrire",
      // About Snapshot
      aboutTitle: 'Qui sommes-nous',
      aboutMission: 'Notre Mission',
      aboutMissionDesc:
        "Mettre en œuvre la politique de l'État dans le domaine de la formation professionnelle et qualifier les jeunes pour le marché du travail.",
      aboutVision: 'Notre Vision',
      aboutVisionDesc:
        'Garantir une formation de haute qualité répondant aux besoins du marché et ouvrant des perspectives aux jeunes.',
      // Features (4)
      whyTitle: "Pourquoi Choisir l'ATFP ?",
      whySubtitle: 'Une formation de qualité pour une carrière réussie.',
      features: [
        {
          title: 'Diplômes Reconnus',
          desc: "Certifications validées par l'état et reconnues par les entreprises.",
        },
        {
          title: 'Formation Pratique',
          desc: 'Apprenez par la pratique avec des équipements modernes et des formateurs experts.',
        },
        {
          title: 'Large Réseau',
          desc: 'Plus de 136 centres de formation répartis sur tout le territoire.',
        },
        {
          title: 'Insertion Professionnelle',
          desc: "Accompagnement à l'emploi et partenariat avec les entreprises.",
        },
      ],
      // Stats (4)
      stats: {
        centers: 'Centres',
        specs: 'Spécialités',
        students: 'Apprenants',
        sectors: 'Secteurs',
      },
      // How It Works
      howTitle: 'Comment ça marche ?',
      howSubtitle: 'Trois étapes simples pour commencer',
      steps: [
        {
          title: 'Créez votre compte',
          desc: 'Inscription gratuite en quelques minutes.',
          icon: 'person-plus',
        },
        {
          title: 'Trouvez une formation',
          desc: 'Parcourez plus de 400 spécialités et choisissez.',
          icon: 'search',
        },
        {
          title: 'Postulez',
          desc: 'Envoyez votre dossier et suivez-le en temps réel.',
          icon: 'send-check',
        },
      ],
      // Sectors
      sectorsTitle: 'Secteurs de Formation',
      sectorsSubtitle: 'Découvrez nos domaines de formation variés',
      sectorsList: [
        { title: "Technologies de l'Information", icon: 'pc-display' },
        { title: 'Mécanique & Électricité', icon: 'gear-wide-connected' },
        { title: 'Bâtiment & Travaux Publics', icon: 'building' },
        { title: 'Agriculture & Agroalimentaire', icon: 'tree' },
        { title: 'Tourisme & Hôtellerie', icon: 'cup-hot' },
        { title: 'Textile & Habillement', icon: 'scissors' },
        { title: 'Santé & Bien-être', icon: 'heart-pulse' },
        { title: 'Gestion & Administration', icon: 'briefcase' },
      ],
      // Testimonials
      testimonialsTitle: 'Ce que disent nos apprenants',
      testimonialsSubtitle: 'Des histoires de réussite réelles',
      testimonials: [
        {
          name: 'Ahmed Ben Salem',
          role: 'Diplômé en Informatique',
          quote:
            "La formation à l'ATFP a transformé ma carrière. Je travaille aujourd'hui comme développeur.",
        },
        {
          name: 'Fatma Zahra',
          role: 'Diplômée en Design',
          quote:
            'Les formateurs étaient excellents et les équipements modernes. Je recommande vivement.',
        },
        {
          name: 'Mohamed Arbi',
          role: 'Diplômé en Mécanique',
          quote:
            "Grâce à la formation pratique, j'ai trouvé un emploi dès l'obtention de mon diplôme.",
        },
      ],
      // Final CTA
      finalCtaTitle: 'Prêt à commencer votre parcours ?',
      finalCtaSubtitle: "Rejoignez des milliers d'apprenants qui ont réussi",
      finalCtaButton: 'Se Connecter',
      // Enhanced Footer
      footerAbout:
        "L'ATFP offre une formation professionnelle de qualité pour préparer les jeunes Tunisiens au marché du travail.",
      footerLinks: 'Liens Rapides',
      footerContact: 'Contactez-nous',
      footerAddress: 'Tunis, Tunisie',
      footerPhone: '+216 71 000 000',
      footerEmail: 'contact@atfp.tn',
    },
    // About (Existing)
    about: {
      title: "À Propos de l'ATFP",
      subtitle: 'Agence Tunisienne de la Formation Professionnelle',
      missionTitle: 'Notre Mission',
      missionDesc:
        "L'Agence Tunisienne de la Formation Professionnelle met en œuvre la politique gouvernementale dans le domaine de la formation professionnelle initiale pour les jeunes et les travailleurs.",
      visionTitle: 'Notre Vision',
      visionDesc:
        "Garantir une formation de haute qualité qui répond aux besoins du marché du travail et ouvre de larges perspectives pour les jeunes en Tunisie et à l'étranger.",
      statsTitle: 'Nos Chiffres',
      structureTitle: 'Notre Structure',
      structureSubtitle: 'Une couverture nationale',
      structureDesc: 'Une couverture nationale avec des centres répartis sur tout le territoire.',
      partnershipTitle: 'Partenariat Entreprises',
      partnershipDesc: "Partenariat étroit avec les entreprises pour l'alternance et l'emploi.",
      coopTitle: 'Coopération Internationale',
      coopDesc: 'Programmes de coopération avec des partenaires internationaux.',
      creationDate: 'Date de Création',
      sectors: 'Secteur Professionnel',
    },
    // Footer (Existing)
    footer: {
      rights: '© 2026 Agence Tunisienne de la Formation Professionnelle. Tous droits réservés.',
    },
    // Login Page
    login: {
      title: 'Connexion',
      subtitle: 'Bienvenue ! Veuillez entrer vos coordonnées.',
      emailLabel: 'Email',
      passwordLabel: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      loginButton: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      registerLink: "S'inscrire",
    },
    // User Dashboard
    dashboard: {
      title: 'Tableau de Bord',
      subtitle: 'Bienvenue sur votre espace candidat ATFP.',
      notifications: {
        title: 'Notifications',
        none: 'Aucune notification',
        unread: 'non lue',
        unreadPlural: 'non lues',
        allRead: 'Tout lu ✓',
        total: 'au total',
        refresh: 'Actualiser',
        loading: 'Chargement des notifications...',
        allUpToDate: 'Tout est à jour !',
        emptySubtitle: 'Vous recevrez ici les mises à jour de vos candidatures.',
        accepted: '✓ Acceptée',
        rejected: '✗ Refusée',
        info: 'Info',
        at: 'à',
      },
      quickActions: {
        title: 'Accès Rapide',
        search: 'Chercher une formation',
        searchSub: 'Parcourir les offres',
        apps: 'Mes candidatures',
        appsSub: 'Suivre vos dossiers',
        profile: 'Mettre à jour le profil',
        profileSub: 'Modifier vos informations',
      },
    },
    // Dashboard / Search
    search: {
      title: 'Trouver une Formation',
      subtitle:
        'Découvrez les opportunités de formation et réalisez votre ambition professionnelle.',
      filters: {
        title: 'Critères de Recherche',
        level: 'Niveau Scolaire',
        diploma: 'Diplôme',
        specialty: 'Spécialité',
        gov: 'Gouvernorat',
        sector: 'Secteur',
        center: 'Centre de Formation',
        all: 'Tout',
        searchPlaceholder: 'Rechercher...',
      },
      buttons: {
        search: 'Rechercher',
        apply: 'Postuler',
      },
      results: {
        title: 'Formations Disponibles',
        loading: 'Recherche en cours...',
        noResults: 'Aucune offre trouvée.',
      },
      columns: {
        date: 'Date de début',
      },
      card: {
        duration: 'Durée',
        center: 'Centre',
        detailsButton: 'Détails',
        applyButton: 'Postuler',
      },
    },
    // My Applications
    applications: {
      title: 'Mes Candidatures',
      subtitle: 'Suivez le statut de vos demandes.',
      status: {
        draft: 'Brouillon',
        pending: 'En attente',
        submitted: 'Envoyée',
        accepted: 'Acceptée',
        rejected: 'Refusée',
      },
      empty: 'Aucune candidature pour le moment.',
      emptySubtitle: "Vous n'avez pas encore postulé à une formation.",
      searchButton: 'Chercher une formation',
      columns: {
        housing: 'Hébergement',
        scholarship: 'Bourse',
      },
      actions: {
        delete: 'Supprimer',
        confirm: 'Confirmer',
        printReceipt: 'Imprimer Reçu',
      },
    },
    // Profile / Details
    profile: {
      title: 'Mon Profil',
      subtitle: 'Gérez vos informations personnelles.',
      personalInfo: 'Informations Personnelles',
      contactInfo: 'Coordonnées',
      birthInfo: 'Données de Naissance',
      educationInfo: 'Parcours Scolaire',
      credentials: 'Identifiants',
      account: 'Compte',
      verified: 'Compte Vérifié',
      labels: {
        name: 'Nom et Prénom',
        cin: 'N° CIN',
        email: 'Email',
        currentEmail: 'Email Actuel',
        newEmail: 'Nouvel Email',
        phone: 'Mobile',
        telFixe: 'Tél Fixe',
        address: 'Adresse',
        postalCode: 'Code Postal',
        gouvernorat: 'Gouvernorat',
        delegation: 'Délégation',
        municipalite: 'Municipalité',
        birthDate: 'Date de Naissance',
        gender: 'Genre',
        birthYear: 'Année de Naissance',
        birthCertNumber: 'N° Inscription Extrait',
        etablissement: 'Etablissement scolaire',
        typeEtablissement: "Type d'établissement",
        niveauScolaire: 'Niveau scolaire',
        anneeAbandon: "Année d'abandon",
      },
      actions: {
        edit: 'Modifier',
        editEmail: 'Modifier Email',
        save: 'Enregistrer',
        update: 'Mettre à jour',
        cancel: 'Annuler',
      },
    },
    // Registration (Common labels)
    registration: {
      title: 'Inscription',
      subtitle: 'Créez votre compte pour commencer votre parcours.',
      steps: {
        personal: 'Info Personnelle',
        birth: 'Extrait de Naissance',
        contact: 'Contact',
        education: 'Éducation',
      },
      buttons: {
        next: 'Suivant',
        prev: 'Précédent',
        submit: "S'inscrire",
      },
    },
    // Admin
    admin: {
      nav: {
        dashboard: 'Tableau de bord',
        candidatures: 'Candidatures',
        offres: 'Offres',
        users: 'Utilisateurs',
      },
      dashboard: {
        title: 'Administration',
        subtitle: "Vue d'ensemble du système",
        users: 'Utilisateurs',
        pending: 'En attente',
        accepted: 'Acceptées',
        offres: 'Offres',
        manageCandidatures: 'Gérer les candidatures',
        manageOffres: 'Gérer les offres de formation',
        manageUsers: 'Gérer les utilisateurs',
      },
      candidatures: {
        subtitle: 'Gérer toutes les candidatures',
        all: 'Tout',
        candidate: 'Candidat',
        speciality: 'Spécialité',
        center: 'Centre',
        statusCol: 'Statut',
        empty: 'Aucune candidature',
      },
      offres: {
        subtitle: 'Gérer les offres de formation',
        create: 'Nouvelle offre',
        edit: "Modifier l'offre",
        speciality: 'Spécialité',
        center: 'Centre',
        diploma: 'Diplôme',
        startDate: 'Début',
        endDate: 'Fin',
        places: 'Places',
        candidaturesCount: 'Candidatures',
        housing: 'Hébergement',
        scholarship: 'Bourse',
        empty: 'Aucune offre',
      },
      users: {
        subtitle: 'Gérer les comptes utilisateurs',
        name: 'Nom',
        phone: 'Téléphone',
        role: 'Rôle',
        candidaturesCount: 'Candidatures',
        empty: 'Aucun utilisateur',
      },
      status: {
        pending: 'En attente',
        accepted: 'Acceptée',
        rejected: 'Refusée',
        draft: 'Brouillon',
      },
    },
    // Toasts & Confirmations
    toast: {
      auth: {
        loginSuccess: 'Connexion réussie. Bienvenue !',
        loginError: 'Identifiants incorrects ou problème de connexion.',
        noToken: 'Connexion réussie mais aucun jeton reçu.',
        logoutSuccess: 'Vous êtes déconnecté.',
      },
      profile: {
        updateInfoSuccess: 'Informations mises à jour !',
        updateInfoError: 'Erreur lors de la mise à jour.',
        updateEmailSuccess: 'Email mis à jour !',
        updateEmailError: "Erreur lors de la mise à jour de l'email.",
      },
      registration: {
        fileTooLarge: 'Le fichier est trop grand (Max 2MB)',
        formErrors:
          'Veuillez vérifier les erreurs dans le formulaire (Email ou extrait de naissance).',
        success: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
        error: "Une erreur s'est produite lors de l'inscription.",
      },
      offers: {
        applyConfirm: 'Voulez-vous postuler à cette offre ?',
        applySuccess: 'Candidature réussie !',
        applyError: 'Erreur lors de la candidature.',
      },
      admin: {
        deleteUserConfirm: 'Supprimer cet utilisateur et toutes ses candidatures ?',
        deleteUserSuccess: 'Utilisateur supprimé avec succès.',
        deleteError: 'Erreur lors de la suppression.',
        saveError: "Erreur lors de l'enregistrement.",
        offerUpdateSuccess: 'Offre mise à jour !',
        offerCreateSuccess: 'Offre créée avec succès !',
        deleteOfferConfirm: 'Supprimer cette offre ?',
        deleteOfferSuccess: 'Offre supprimée.',
        acceptCandidatureSuccess: 'Candidature acceptée et notifiée.',
        acceptCandidatureError: "Erreur lors de l'acceptation.",
        rejectCandidatureSuccess: 'Candidature refusée et notifiée.',
        rejectCandidatureError: 'Erreur lors du refus.',
        deleteCandidatureConfirm: 'Supprimer cette candidature ?',
        deleteCandidatureSuccess: 'Candidature supprimée.',
      },
    },
  },
};

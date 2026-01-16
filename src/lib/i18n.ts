export type Locale = "uz" | "en";

export const copy = {
  uz: {
    nav: {
      students: "Talabalar uchun",
      centers: "O'quv markazlar uchun",
      features: "Imkoniyatlar",
      pricing: "Narxlar",
      faq: "Savol-javob",
    },
    hero: {
      eyebrow: "ExamWay platformasi",
      title: "IELTS natijasi uchun aniq yo'l va real mock testlar",
      subtitle:
        "Strukturali kurslar, progress kuzatuvi va imtihon sharoitidagi sinovlar. Markazlar uchun esa standart testlar, tezkor hisobot va brendingga tayyor tizim.",
      primaryCta: "O'qishni boshlash",
      secondaryCta: "Demo so'rash (B2B)",
      trustNote: "Beta bosqich: birinchi markazlar uchun maxsus shartlar.",
    },
    socialProof: {
      title: "Ishonch signallari",
      logos: ["LOGO", "LOGO", "LOGO", "LOGO", "LOGO"],
      testimonials: [
        {
          quote:
            "Mock testlar real imtihondek bo'ldi. Natijamni oldindan bilib oldim.",
          name: "Malika S.",
          role: "IELTS talabasi",
        },
        {
          quote:
            "Hisobotlar va guruhlar kesimida ko'rinish bizga vaqt tejaydi.",
          name: "Aziz J.",
          role: "O'quv markaz rahbari",
        },
      ],
    },
    overview: {
      title: "Ikki auditoriya, bitta tizim",
      tabs: {
        students: {
          label: "Talabalar uchun",
          title: "Natijaga yo'naltirilgan tayyorgarlik",
          summary:
            "Har bir modul maqsadga bog'langan. Siz qayerda adashganingizni ko'rasiz va keyingi qadamni aniq bilasiz.",
          bullets: [
            "Bandlikka mos o'quv yo'li",
            "Har haftalik progress tahlili",
            "Real IELTS formatidagi mock testlar",
          ],
        },
        centers: {
          label: "O'quv markazlar uchun",
          title: "Standartlashtirilgan mock testlar va boshqaruv",
          summary:
            "O'quvchilaringizni tez baholang, natijalarni bir xil mezonda taqqoslang va hisobotni bir necha daqiqada tayyorlang.",
          bullets: [
            "O'qituvchilar va o'quvchilar boshqaruvi",
            "Guruhlar bo'yicha hisobotlar",
            "Brending va white-label tayyorgarligi",
          ],
        },
      },
    },
    features: {
      title: "Asosiy imkoniyatlar",
      items: [
        {
          title: "Strukturali kurslar",
          description: "Modul va haftalik rejalar bilan aniq yo'nalish.",
        },
        {
          title: "AI-uslubidagi fikr-mulohaza",
          description: "Javoblar bo'yicha yo'l-yo'riq (beta placeholder).",
        },
        {
          title: "Mock testlar",
          description: "IELTS sharoitiga yaqin real sinovlar.",
        },
        {
          title: "Analitika",
          description: "Bo'limlar kesimida kuchli va zaif tomonlar.",
        },
        {
          title: "Admin vositalar",
          description: "Guruhlar, o'qituvchilar va o'quvchilar nazorati.",
        },
        {
          title: "White-label",
          description: "Markaz brendi bilan ishlashga tayyor arxitektura.",
        },
      ],
    },
    howItWorks: {
      title: "Qanday ishlaydi",
      steps: [
        {
          title: "Daraja va maqsad",
          text: "Boshlang'ich diagnostika va kerakli band score.",
        },
        {
          title: "Modullar bo'yicha o'qish",
          text: "Kunlik rejalar va qisqa nazorat testlari.",
        },
        {
          title: "Mock test",
          text: "Real formatda sinov va natijalar tahlili.",
        },
        {
          title: "Qayta tayyorlash",
          text: "Zaif bo'limlarni kuchaytirish rejalari.",
        },
      ],
    },
    pricing: {
      title: "Moslashuvchan narxlar",
      tiers: [
        {
          name: "Student",
          price: "79 000 so'm/oy",
          note: "Individual tayyorgarlik uchun.",
          features: [
            "Kurs modullari",
            "Progress kuzatuvi",
            "Oyiga 1 ta mock test",
          ],
        },
        {
          name: "Pro",
          price: "159 000 so'm/oy",
          note: "Maksimal natija uchun.",
          features: [
            "Barcha modullar",
            "Ko'proq mock testlar",
            "Ustuvor qo'llab-quvvatlash",
          ],
        },
        {
          name: "Center",
          price: "Kelishuv asosida",
          note: "O'quvchi soni bo'yicha narxlash.",
          features: [
            "Admin panel va guruhlar",
            "Hisobotlar va eksport",
            "Brendingga tayyor",
          ],
        },
      ],
      seatNote: "Center rejasi o'quvchi soniga qarab belgilanadi.",
    },
    faq: {
      title: "Ko'p beriladigan savollar",
      items: [
        {
          q: "White-label qachon tayyor bo'ladi?",
          a: "Birinchi versiya brending sozlamalari bilan chiqadi, keyin custom domen qo'shiladi.",
        },
        {
          q: "Hisobotlar qanday ko'rinishda?",
          a: "Guruh, o'qituvchi va o'quvchi kesimida PDF yoki Excel eksport.",
        },
        {
          q: "Onboarding qancha vaqt oladi?",
          a: "Odatda 3-5 ish kuni ichida markaz ishga tushadi.",
        },
        {
          q: "Ma'lumotlar kimga tegishli?",
          a: "Barcha o'quvchi ma'lumotlari markazingizga tegishli bo'ladi.",
        },
      ],
    },
    leads: {
      title: "Boshlashga tayyormisiz?",
      studentTitle: "Talabalar uchun kutish ro'yxati",
      centerTitle: "O'quv markazlar uchun demo",
      studentCta: "Kutish ro'yxatiga yozilish",
      centerCta: "Demo so'rash",
      fields: {
        name: "Ism",
        center: "Markaz nomi",
        email: "Email",
        phone: "Telefon",
        message: "Xabar",
      },
      placeholders: {
        name: "Ismingiz",
        center: "Markaz nomi",
        email: "name@example.com",
        phone: "+998 90 000 00 00",
        message: "Qisqacha maqsadingiz",
      },
      validation: {
        required: "Majburiy maydon.",
        email: "Email noto'g'ri kiritildi.",
      },
      success: "Rahmat! Tez orada bog'lanamiz.",
      error: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    },
    footer: {
      tag: "ExamWay - IELTS uchun aniq yo'l.",
      linksTitle: "Bo'limlar",
      contactTitle: "Aloqa",
      rights: "Barcha huquqlar himoyalangan.",
    },
  },
  en: {
    nav: {
      students: "For Students",
      centers: "For Learning Centers",
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
    },
    hero: {
      eyebrow: "ExamWay platform",
      title: "A clear path to IELTS results and real mock tests",
      subtitle:
        "Structured courses, progress tracking, and exam-like tests. For centers: standardized testing, fast reporting, and branding-ready setup.",
      primaryCta: "Start Learning",
      secondaryCta: "Request Demo (B2B)",
      trustNote: "Beta access with special terms for early partners.",
    },
    socialProof: {
      title: "Social proof",
      logos: ["LOGO", "LOGO", "LOGO", "LOGO", "LOGO"],
      testimonials: [
        {
          quote:
            "The mock tests felt like the real exam. I knew my score range early.",
          name: "Malika S.",
          role: "IELTS student",
        },
        {
          quote:
            "Reporting by group saves our team hours every week.",
          name: "Aziz J.",
          role: "Learning center director",
        },
      ],
    },
    overview: {
      title: "Two audiences, one platform",
      tabs: {
        students: {
          label: "For Students",
          title: "Outcome-driven prep",
          summary:
            "Each module links to a score goal. You always know what to fix next.",
          bullets: [
            "Flexible study paths",
            "Weekly progress insights",
            "Real IELTS-format mock tests",
          ],
        },
        centers: {
          label: "For Centers",
          title: "Standardized tests and management",
          summary:
            "Evaluate learners fast, compare results fairly, and export reports in minutes.",
          bullets: [
            "Teacher and student management",
            "Group-based reporting",
            "Branding and white-label ready",
          ],
        },
      },
    },
    features: {
      title: "Core capabilities",
      items: [
        {
          title: "Structured courses",
          description: "Module-based plans with clear outcomes.",
        },
        {
          title: "AI-style feedback",
          description: "Guidance on answers (beta placeholder).",
        },
        {
          title: "Mock tests",
          description: "Exam-like practice under real conditions.",
        },
        {
          title: "Analytics",
          description: "Strengths and gaps by section.",
        },
        {
          title: "Admin tools",
          description: "Manage groups, teachers, and learners.",
        },
        {
          title: "White-label",
          description: "Architecture ready for center branding.",
        },
      ],
    },
    howItWorks: {
      title: "How it works",
      steps: [
        {
          title: "Level and goal",
          text: "Quick diagnostic and target band score.",
        },
        {
          title: "Study by modules",
          text: "Daily plans with short checkpoints.",
        },
        {
          title: "Mock test",
          text: "Real format, timed, and analyzed.",
        },
        {
          title: "Refine and repeat",
          text: "Strengthen weak areas with focused plans.",
        },
      ],
    },
    pricing: {
      title: "Flexible pricing",
      tiers: [
        {
          name: "Student",
          price: "79,000 UZS / mo",
          note: "For individual prep.",
          features: [
            "Course modules",
            "Progress tracking",
            "1 mock test per month",
          ],
        },
        {
          name: "Pro",
          price: "159,000 UZS / mo",
          note: "For faster outcomes.",
          features: [
            "All modules",
            "More mock tests",
            "Priority support",
          ],
        },
        {
          name: "Center",
          price: "By request",
          note: "Seat-based pricing.",
          features: [
            "Admin panel and groups",
            "Reports and exports",
            "Branding-ready",
          ],
        },
      ],
      seatNote: "Center plans are priced per active learner.",
    },
    faq: {
      title: "Frequently asked",
      items: [
        {
          q: "When is white-label available?",
          a: "Initial release includes branding settings, with custom domains next.",
        },
        {
          q: "What reports are included?",
          a: "Exports by group, teacher, and student in PDF or Excel.",
        },
        {
          q: "How long does onboarding take?",
          a: "Most centers go live in 3-5 business days.",
        },
        {
          q: "Who owns the data?",
          a: "All learner data remains the property of your center.",
        },
      ],
    },
    leads: {
      title: "Ready to get started?",
      studentTitle: "Student waitlist",
      centerTitle: "Center demo request",
      studentCta: "Join the waitlist",
      centerCta: "Request demo",
      fields: {
        name: "Name",
        center: "Center name",
        email: "Email",
        phone: "Phone",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        center: "Center name",
        email: "name@example.com",
        phone: "+998 90 000 00 00",
        message: "Tell us what you need",
      },
      validation: {
        required: "This field is required.",
        email: "Please enter a valid email.",
      },
      success: "Thanks! We'll reach out shortly.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      tag: "ExamWay - a clear path to IELTS outcomes.",
      linksTitle: "Sections",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
  },
} as const;

export const clinic = {
  name: "Simply Smilez Dental",
  address: "P.V. Reddy Complex, 1st Floor, Dwaraka Nagar Colony, O.U. Colony Road, Shaikpet, Hyderabad, Telangana 500008",
  phonePrimary: "96033 38904",
  phoneSecondary: "77993 76656",
  phonePrimaryHref: "+919603338904",
  phoneSecondaryHref: "+917799376656",
  hoursWeekdays: "Monday - Saturday, 10:00 am - 9:00 pm",
  hoursSunday: "Sunday, 11:00 am - 4:00 pm",
  directions: "https://www.google.com/maps/search/?api=1&query=P.V.+Reddy+Complex%2C+Dwaraka+Nagar+Colony%2C+Shaikpet%2C+Hyderabad+500008",
};

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const photos = {
  hero: '/hero.jpeg',
  clinic: pexels(4269277),
  consultation: pexels(4270093),
  treatment: pexels(5355841),
  adultSmile: pexels(9775440),
  naturalSmile: pexels(6706752),
  child: '/dr-sus.jpeg',
  childCheckup: pexels(7800560),
  dentalModel: pexels(4269687),
  dentalCare: pexels(4269369),
  dentalTablet: pexels(4270094),
  veneers: pexels(6627571),
  clinicChair: pexels(4269268),
  alignment: pexels(4270084),
};

export const clinicPhotos = {
  interior: "https://www.simplysmilezdental.in/images/gallery-a.webp",
  consultation: "https://www.simplysmilezdental.in/images/gallery-b.webp",
  care: "https://www.simplysmilezdental.in/images/gallery-c.webp",
};

export interface Treatment {
  slug: string;
  title: string;
  short: string;
  intro: string;
  photo: string;
  photoAlt: string;
  reasons: string[];
  process: string[];
  benefits: string[];
  considerations: string[];
  suitability: string;
  faqs: { question: string; answer: string }[];
}

export const treatments: Treatment[] = [
  {
    slug: "invisalign-braces",
    title: "Invisalign & Braces",
    short: "Orthodontic options planned around your teeth, bite and everyday life.",
    intro: "Invisalign clear aligners and traditional braces can both help address alignment and bite concerns. A consultation helps you understand which approach may suit your oral health, treatment goals and daily routine.",
    photo: photos.alignment,
    photoAlt: "A dental professional discusses an orthodontic model with a patient.",
    reasons: ["Crowded or overlapping teeth", "Gaps or spacing between teeth", "Bite concerns such as an overbite or crossbite"],
    process: ["Discuss what you would like to change and review your dental history.", "Examine your teeth and bite; records or imaging may be recommended.", "Compare suitable aligner and braces options, care needs and next steps.", "Attend planned reviews and follow retention advice after active treatment."],
    benefits: ["A choice of removable clear aligners or fixed braces may be available.", "A considered plan can address both tooth alignment and bite relationships.", "Progress and oral hygiene can be reviewed during follow-up visits."],
    considerations: ["Aligners need consistent wear as advised and are removed for meals and cleaning.", "Braces and aligners both require careful cleaning and periodic reviews.", "Treatment length and results vary; retention is commonly part of orthodontic care."],
    suitability: "Orthodontic care is planned after an individual assessment. Gum health, tooth condition, bite, growth and your ability to follow the care plan all matter. Not every case is suitable for clear aligners.",
    faqs: [
      { question: "Are clear aligners suitable for everyone?", answer: "No. Suitability depends on the type and complexity of tooth movement, bite, oral health and your ability to follow the wear plan. A clinician can compare options after examining you." },
      { question: "How are braces different from aligners?", answer: "Braces are fixed to the teeth, while clear aligners are removable trays. Each has different care routines and indications; the best option depends on your assessment." },
      { question: "Will I need retainers afterwards?", answer: "Retention is commonly recommended after active orthodontic treatment to help maintain tooth position. Your dentist will explain an appropriate plan." },
    ],
  },
  {
    slug: "invisalign-first",
    title: "Invisalign First for Kids",
    short: "Early orthodontic guidance for selected children as their smiles grow.",
    intro: "Invisalign First is a clear-aligner option designed for some children in the mixed-dentition stage. An orthodontic assessment can help establish whether early treatment is useful now or whether observation is the better next step.",
    photo: photos.child,
    photoAlt: "A parent and child speak with a dental professional during a consultation.",
    reasons: ["Crowding or spacing while adult teeth are coming through", "A developing bite or jaw relationship that needs review", "An orthodontic concern identified during a routine dental visit"],
    process: ["Talk through your child's dental development and your concerns.", "Review the bite, incoming teeth and oral health; records may be taken if needed.", "Discuss whether early aligners, another approach or monitoring is appropriate.", "If treatment is advised, plan reviews and parent-supported daily wear."],
    benefits: ["A removable option may fit some family routines.", "An early review can clarify whether a concern needs attention now or later.", "Parents and children can understand the plan together before deciding."],
    considerations: ["Early orthodontic treatment is not necessary for every child.", "Removable aligners depend on the child wearing and caring for them as advised.", "Growth and tooth eruption continue, so further orthodontic care may be needed later."],
    suitability: "A child's age alone does not determine suitability. Dental development, bite, cooperation, oral hygiene and the specific concern are considered by the treating clinician with a parent or guardian.",
    faqs: [
      { question: "Does every child need Invisalign First?", answer: "No. Many children benefit from regular dental checks and monitoring instead. A clinician can explain whether early orthodontic care is indicated for your child." },
      { question: "Can a child remove the aligners?", answer: "The trays are removable for eating, drinking anything other than water and cleaning. They need to be worn for the schedule advised by the treating clinician." },
      { question: "Will my child still need later orthodontic treatment?", answer: "That depends on growth, tooth eruption and the original concern. Early care may be one part of a longer plan, but no specific outcome can be promised." },
    ],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    short: "A carefully planned option for replacing one or more missing teeth.",
    intro: "A dental implant is a small fixture placed in the jaw to support a replacement tooth or restoration. Whether an implant is appropriate depends on your oral health, bone, medical history and individual preferences.",
    photo: photos.treatment,
    photoAlt: "A patient receiving dental care in a contemporary treatment room.",
    reasons: ["One or more missing teeth", "A tooth that may need to be removed after assessment", "Exploring alternatives to a removable tooth replacement"],
    process: ["Review your health history, teeth, gums and priorities.", "Plan the site and restoration; dental imaging may be recommended.", "Discuss the implant procedure, healing stages and alternative options.", "Arrange reviews and ongoing care if you proceed with treatment."],
    benefits: ["An implant-supported restoration can replace a missing tooth without relying on a removable appliance.", "Planning can consider appearance, chewing function and neighbouring teeth.", "The restoration can be cared for as part of ongoing dental maintenance."],
    considerations: ["Implant treatment involves a procedure and a healing period.", "Gum health, bone volume, smoking and some medical conditions may affect suitability or timing.", "Implants require consistent home care and professional maintenance; alternatives should also be discussed."],
    suitability: "Implant suitability is determined only after an individual clinical examination and review of relevant medical information and imaging. A different tooth-replacement option may be more appropriate for some people.",
    faqs: [
      { question: "Can anyone have a dental implant?", answer: "Not everyone is a suitable candidate. Your gum health, available bone, general health, medicines and other factors are reviewed before treatment is considered." },
      { question: "How long does implant treatment take?", answer: "Timing varies with the treatment plan, healing and whether additional procedures are needed. The clinic can discuss likely stages after assessment." },
      { question: "How do I care for an implant?", answer: "Good daily cleaning and regular dental reviews are important. Your clinician can show you how to care for the implant and surrounding gum tissue." },
    ],
  },
  {
    slug: "root-canal",
    title: "Root Canal Treatment",
    short: "Care to address inflammation or infection inside a tooth and assess whether it can be preserved.",
    intro: "Root canal treatment addresses the soft tissue inside a tooth when it is inflamed or infected. The aim is to clean and seal the root canal system and then restore the tooth as advised after a clinical assessment.",
    photo: photos.dentalCare,
    photoAlt: "A dentist explains dental care options to a patient using a tooth model.",
    reasons: ["Persistent toothache or sensitivity that needs assessment", "Deep decay or a tooth injury", "Swelling or infection identified during an examination"],
    process: ["Examine the tooth and review symptoms; dental imaging may be advised.", "Discuss diagnosis, alternatives, expected visits and comfort measures.", "Clean and shape the canal system, then seal it when appropriate.", "Restore the tooth and arrange follow-up care."],
    benefits: ["May help retain a natural tooth that would otherwise be considered for removal.", "Treats the affected tissue within the tooth after diagnosis.", "A suitable restoration can help return the tooth to use."],
    considerations: ["The tooth may need a crown or other restoration after treatment.", "The number of visits depends on the tooth and clinical findings.", "Tenderness can occur after treatment; contact the clinic if symptoms concern you."],
    suitability: "The cause of tooth pain can vary. Examination and, where appropriate, imaging are needed to confirm whether root canal treatment, another treatment or referral is suitable.",
    faqs: [
      { question: "Does every painful tooth need a root canal?", answer: "No. Tooth pain can have many causes. An examination is needed to identify the cause and discuss appropriate options." },
      { question: "Will the tooth need another restoration afterwards?", answer: "Often the tooth needs a restoration to protect it and restore function. The choice depends on how much tooth structure remains." },
      { question: "Is root canal treatment always completed in one visit?", answer: "The number of visits varies with the tooth and clinical situation. Your dentist can explain the likely stages for your case." },
    ],
  },
  {
    slug: "crowns-fillings",
    title: "Dental Crowns & Composite Fillings",
    short: "Restorative options for teeth affected by decay, wear or damage.",
    intro: "A composite filling repairs a smaller area of tooth damage, while a crown covers more of the tooth when additional support is needed. The right restoration depends on the tooth, the amount of remaining structure and your needs.",
    photo: photos.dentalModel,
    photoAlt: "A dental professional demonstrates a tooth model during a consultation.",
    reasons: ["A cavity or damaged area that needs restoring", "A tooth weakened by wear, a large filling or fracture", "An existing restoration that needs review or replacement"],
    process: ["Examine the tooth and discuss symptoms and previous treatment.", "Compare filling and crown options, materials and maintenance.", "Prepare and restore the tooth using the agreed approach.", "Review your bite and explain how to care for the restoration."],
    benefits: ["Restorations can repair damaged areas and support chewing function.", "Composite fillings are tooth-coloured and may suit selected smaller repairs.", "A crown can cover and protect a tooth when a filling alone is not appropriate."],
    considerations: ["A crown usually requires reshaping more of the tooth than a filling.", "Restorations can wear, chip or need replacement over time.", "Material choice and treatment steps depend on the tooth and clinical findings."],
    suitability: "Your dentist can assess the size and position of damage, bite forces, gum health and remaining tooth structure before recommending a filling, crown or another option.",
    faqs: [
      { question: "How do I know if I need a crown or a filling?", answer: "That depends on how much of the tooth is affected and how much healthy structure remains. Your dentist can explain the options after examining it." },
      { question: "Are composite fillings tooth-coloured?", answer: "Composite materials are tooth-coloured. Shade and suitability depend on the tooth and the size and location of the repair." },
      { question: "Can a crown need replacement?", answer: "Crowns can wear or become damaged over time. Regular reviews help your dentist monitor the crown and the tooth beneath it." },
    ],
  },
  {
    slug: "veneers-whitening",
    title: "Dental Veneers & Teeth Whitening",
    short: "Cosmetic options to discuss when you are considering a change to your smile.",
    intro: "Veneers and professional teeth whitening address different concerns. Whitening changes the shade of natural teeth, while veneers are thin restorations that cover the front surface of selected teeth. A consultation helps clarify which options are appropriate.",
    photo: photos.veneers,
    photoAlt: "Close-up editorial photograph illustrating cosmetic dental care.",
    reasons: ["Tooth shade concerns or external staining", "Small chips, shape differences or spaces between selected teeth", "Questions about the appearance of existing restorations"],
    process: ["Talk through the changes you hope to make and your oral health history.", "Check for decay, gum concerns, sensitivity and existing restorations.", "Discuss whitening, veneers, restorative alternatives and their limitations.", "Agree on a plan only after you understand the maintenance and trade-offs."],
    benefits: ["Whitening can lighten natural tooth shade for some people.", "Veneers may change the appearance of selected front teeth.", "A consultation can compare conservative options before a decision is made."],
    considerations: ["Whitening results vary and do not change the shade of crowns or fillings.", "Veneers may involve permanent changes to tooth structure and need maintenance.", "Sensitivity or other side effects may occur; suitability must be assessed."],
    suitability: "Cosmetic treatment should follow a review of oral health and a discussion of expectations. Whitening or veneers may not be recommended in some situations; outcomes vary by person.",
    faqs: [
      { question: "Will whitening change the shade of fillings or crowns?", answer: "No. Whitening affects natural tooth structure and does not lighten existing restorations. Your dentist can discuss shade matching and alternatives." },
      { question: "Are veneers reversible?", answer: "Veneer treatment may involve removing tooth structure and is not generally considered reversible. Ask about alternatives, maintenance and long-term implications." },
      { question: "Can everyone have teeth whitening?", answer: "No. The cause of discolouration and the health of teeth and gums matter. A dental assessment can help determine whether whitening is appropriate." },
    ],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    short: "Supportive dental care for infants, children and growing teenagers.",
    intro: "Children's dental needs change as teeth and jaws develop. Preventive visits, clear explanations and age-appropriate care can help families build healthy routines and address concerns early.",
    photo: photos.childCheckup,
    photoAlt: "A child speaks with a dental professional during a dental visit.",
    reasons: ["A first dental visit or routine check-up", "Toothache, injury, decay or changes in the mouth", "Advice on brushing, diet and caring for growing teeth"],
    process: ["Share your child's health history, routines and any concerns.", "The dentist checks the teeth and gums at a pace appropriate for the child.", "Discuss preventive care or treatment options with the parent or guardian.", "Agree on review timing and practical home-care guidance."],
    benefits: ["Routine dental visits give families a place to discuss oral health.", "Preventive guidance can be adapted to a child's age and development.", "Care can include parents or guardians in conversations and decisions."],
    considerations: ["Each child responds differently to a new clinical setting.", "Treatment recommendations depend on the child's teeth, health and development.", "Urgent symptoms or injuries should be assessed promptly by a dental professional."],
    suitability: "Children should be assessed as individuals. A parent or guardian should share relevant medical information and take part in decisions about care.",
    faqs: [
      { question: "When should a child first visit a dentist?", answer: "Families can ask a dental professional about a first visit when the first teeth appear or by the child's first birthday. The clinic can advise based on your child's needs." },
      { question: "How can I help my child feel prepared?", answer: "Use calm, simple language, explain that the dentist will look at their teeth and bring questions about your child's routines. Avoid promising that no treatment will be needed." },
      { question: "Can children be assessed for Invisalign First?", answer: "Some growing children may be assessed for early orthodontic options. Invisalign First is not needed for every child; an individual review is important." },
    ],
  },
  {
    slug: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    short: "Assessment and care for wisdom teeth causing symptoms or other concerns.",
    intro: "Wisdom teeth do not always need removal. If a tooth is painful, repeatedly inflamed, difficult to clean or affected by another problem, examination and imaging can help determine what care is appropriate.",
    photo: photos.treatment,
    photoAlt: "A patient receives a dental examination in a modern treatment room.",
    reasons: ["Pain or swelling near the back of the mouth", "Repeated gum inflammation around a partly erupted tooth", "A wisdom tooth that is difficult to clean or affected by decay"],
    process: ["Review symptoms and medical history and examine the area.", "Use dental imaging when it is needed to understand tooth position.", "Discuss monitoring, treatment or extraction and any referral needs.", "If extraction is advised, receive written recovery and aftercare guidance."],
    benefits: ["Assessment can establish whether a wisdom tooth is causing a current problem.", "A plan can account for tooth position and nearby structures.", "Options and aftercare can be discussed before deciding on treatment."],
    considerations: ["Extraction is a procedure and recovery varies between people.", "Potential risks, anaesthesia options and aftercare should be discussed in advance.", "Not every wisdom tooth needs to be removed."],
    suitability: "The decision to remove a wisdom tooth depends on symptoms, examination and imaging. Your dentist may discuss monitoring or referral if that is more appropriate.",
    faqs: [
      { question: "Do all wisdom teeth need to be removed?", answer: "No. If a wisdom tooth is healthy and not causing a problem, monitoring may be appropriate. A dentist can advise after examination." },
      { question: "Will I need an X-ray?", answer: "Imaging may be recommended to understand tooth position and nearby structures. Your dentist will explain why it may be useful." },
      { question: "How long does recovery take?", answer: "Recovery varies with the procedure and individual factors. You will receive tailored aftercare instructions and advice on when to contact the clinic." },
    ],
  },
  {
    slug: "laser-gum-treatment",
    title: "Laser Gum Treatment",
    short: "Gum health assessment and treatment options, including laser-assisted care where appropriate.",
    intro: "Gum care starts with understanding the condition of your gums and supporting tissues. Laser-assisted treatment may be considered for selected situations, alongside other periodontal care options.",
    photo: photos.dentalTablet,
    photoAlt: "A dental professional reviews patient information during a consultation.",
    reasons: ["Bleeding or swollen gums", "Persistent gum tenderness or recession", "A gum concern identified during a dental check-up"],
    process: ["Review symptoms and medical history and examine gum health.", "Discuss the diagnosis and whether cleaning, home care or periodontal treatment is advised.", "If laser-assisted care is appropriate, explain the procedure and alternatives first.", "Arrange follow-up checks and practical home-care advice."],
    benefits: ["An assessment can help identify gum concerns and discuss care options.", "Treatment can be planned around the individual's gum health and needs.", "Laser use may be considered for selected procedures, not as a default for everyone."],
    considerations: ["Laser treatment is not suitable or necessary in every case.", "Results depend on diagnosis, home care and ongoing professional maintenance.", "Bleeding gums can have different causes and should be assessed rather than self-diagnosed."],
    suitability: "A periodontal examination is needed before any gum procedure is recommended. Your clinician can explain whether laser-assisted care, another treatment or a referral is appropriate.",
    faqs: [
      { question: "Is laser gum treatment right for everyone?", answer: "No. Whether a laser is appropriate depends on the diagnosis and the procedure being considered. Other gum-care approaches may be more suitable." },
      { question: "What should I do about bleeding gums?", answer: "Arrange a dental assessment, particularly if bleeding is persistent. A clinician can check for gum disease and other possible causes." },
      { question: "Will gum treatment replace daily oral care?", answer: "No. Brushing, interdental cleaning and professional maintenance remain important. Your dental team can demonstrate a routine suited to you." },
    ],
  },
  {
    slug: "general-cosmetic-dentistry",
    title: "General & Cosmetic Dentistry",
    short: "Everyday preventive care and considered options for your dental concerns.",
    intro: "General dentistry supports oral health through examinations, advice and restorative care. When you have cosmetic concerns, a dentist can first check your dental health and discuss realistic options without pressure.",
    photo: photos.consultation,
    photoAlt: "A dentist explains care options to a patient in a bright clinic.",
    reasons: ["A routine dental examination or cleaning discussion", "A toothache, sensitivity or a change in your mouth", "Questions about the appearance or function of your teeth"],
    process: ["Talk through your goals, symptoms and medical history.", "Examine your teeth and gums and recommend further checks if needed.", "Discuss preventive, restorative and cosmetic options, including their limits.", "Plan care in a way that reflects your priorities and oral health."],
    benefits: ["A regular review helps you discuss changes and preventive care.", "Treatment options can be considered together rather than in isolation.", "You can ask questions and consider alternatives before making a decision."],
    considerations: ["The right approach depends on diagnosis and individual needs.", "Some cosmetic procedures can involve permanent changes to teeth.", "No particular appearance or treatment outcome can be guaranteed."],
    suitability: "A dental examination helps distinguish cosmetic preferences from concerns that may first need restorative or gum care. Recommendations should be individualised and explained clearly.",
    faqs: [
      { question: "How often should I have a dental check-up?", answer: "The right interval depends on your oral health and risk factors. Your dentist can suggest a review schedule tailored to you." },
      { question: "Can I talk about cosmetic concerns at a check-up?", answer: "Yes. Share what you would like to change, and your dentist can discuss appropriate options, limitations and any health considerations." },
      { question: "Will my treatment plan be personalised?", answer: "Care recommendations should take account of your examination, health history, priorities and available options. Ask your dentist to explain alternatives." },
    ],
  },
];

export const mainNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Doctors", to: "/doctors" },
  { label: "Treatments", to: "/treatments" },
  { label: "Invisalign", to: "/invisalign" },
  { label: "Kids Dentistry", to: "/kids-dentistry" },
  { label: "Gallery", to: "/gallery" },
  { label: "Patient Information", to: "/patient-information" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

export interface DoctorProfile {
  name: string;
  designation: string;
  specialty: string;
  credentials: string;
  summary: string;
  image: string;
  imageAlt: string;
  verification: string;
  metrics: { value: string; label: string }[];
}

export const doctors: DoctorProfile[] = [
  {
    name: "Dr. Susheel Kumar",
    designation: "Pediatric Dentist & Implantologist in Hyderabad",
    specialty: "Pediatric dentistry · Implantology",
    credentials: "BDS, MDS (Pediatric & Preventive Dentistry)",
    summary: "Dr. Susheel Kumar is a Pediatric Dentist and Implantologist in Hyderabad with 9 years of experience in dentistry. He practices at Simply Smilez Dental Clinic, Manikonda, Hyderabad, and also works as a consultant across 30 clinics in Hyderabad.",
    image: "/dr-susheel.jpg",
    imageAlt: "Dr. Susheel Kumar, Pediatric Dentist and Implantologist.",
    verification: "Verified Specialist",
    metrics: [
      { value: "9+", label: "Years experience" },
      { value: "30", label: "Consulting clinics" },
      { value: "MDS & BDS", label: "Master degrees" },
      { value: "ISPPD", label: "Society member" },
    ],
  },
  {
    name: "Dr. Ankush Kumar",
    designation: "Orthodontist & Invisalign Provider in Hyderabad",
    specialty: "Orthodontics · Invisalign",
    credentials: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
    summary: "Dr. Ankush Kumar is an Orthodontist and Invisalign Provider in Hyderabad with 9 years of experience in orthodontic and dental care. He practices at Simply Smilez Dental Clinic in Manikonda, Hyderabad, and also works as a consultant at 20 clinics across the city.",
    image: "/dr-ankush.jpeg",
    imageAlt: "Dr. Ankush Kumar, Orthodontist and Invisalign Provider.",
    verification: "Certified Invisalign Provider",
    metrics: [
      { value: "9+", label: "Years experience" },
      { value: "20", label: "Consulting clinics" },
      { value: "Invisalign", label: "Certified provider" },
      { value: "IOS", label: "Society member" },
    ],
  },
];

export interface FaqCategory {
  title: string;
  items: { question: string; answer: string }[];
}

export const faqCategories: FaqCategory[] = [
  {
    title: "Clinic information",
    items: [
      { question: "Where is Simply Smilez Dental located?", answer: "The clinic is at P.V. Reddy Complex, 1st Floor, Dwaraka Nagar Colony, O.U. Colony Road, Shaikpet, Hyderabad, Telangana 500008." },
      { question: "What are the clinic opening hours?", answer: "Monday to Saturday, 10:00 am to 9:00 pm; Sunday, 11:00 am to 4:00 pm. Please call to confirm availability before travelling." },
      { question: "Which ages does the clinic care for?", answer: "Simply Smilez Dental offers dental care for children and adults. Treatment recommendations depend on the individual's needs and clinical assessment." },
    ],
  },
  {
    title: "Appointments",
    items: [
      { question: "How can I request an appointment?", answer: "Call 96033 38904 or 77993 76656. You can also use the enquiry form on this website demo; it does not send a message or book an appointment." },
      { question: "What should I bring to my first visit?", answer: "Bring any relevant medical information, a list of medicines and details of recent dental treatment or imaging if available. Please call ahead to confirm anything specific." },
      { question: "What if I need to change my appointment?", answer: "Please call the clinic directly on one of the listed telephone numbers so the team can advise about availability." },
    ],
  },
  {
    title: "General dentistry",
    items: [
      { question: "How often should I schedule a check-up?", answer: "The appropriate interval depends on your dental health and risk factors. Your dentist can recommend a personalised review schedule." },
      { question: "What happens during a dental examination?", answer: "A visit may include a conversation about your health and concerns, an examination of your mouth and discussion of any further checks or care that may be useful." },
      { question: "Should I call about tooth pain?", answer: "Yes. A dentist can assess the cause and advise on appropriate care. If you have facial swelling, fever or difficulty breathing or swallowing, seek urgent medical care." },
    ],
  },
  {
    title: "Root canal treatment",
    items: [
      { question: "Does tooth pain always mean I need a root canal?", answer: "No. There are several possible causes of tooth pain. Examination and sometimes imaging help determine the cause and options." },
      { question: "How many visits does a root canal take?", answer: "The number of visits depends on the tooth and clinical findings. Your dentist can outline a likely schedule after assessing you." },
    ],
  },
  {
    title: "Invisalign and braces",
    items: [
      { question: "Can I choose Invisalign instead of braces?", answer: "An assessment is needed to determine which options can address your alignment and bite concerns. Clear aligners are not suitable for every case." },
      { question: "How long will orthodontic treatment take?", answer: "Treatment time varies with the individual plan and response. A clinician can discuss an estimate after assessment, but it cannot be guaranteed." },
      { question: "Are retainers needed after braces or aligners?", answer: "Retention is commonly recommended after active orthodontic treatment. Follow your clinician's instructions to help maintain tooth position." },
    ],
  },
  {
    title: "Children's dentistry",
    items: [
      { question: "How can I prepare my child for a visit?", answer: "Use a calm, positive explanation and invite your child to ask questions. Share any concerns with the clinic in advance." },
      { question: "Is Invisalign First appropriate for every child?", answer: "No. Early orthodontic treatment is only considered for selected concerns after reviewing a child's growth, teeth, bite and readiness." },
    ],
  },
  {
    title: "Crowns and fillings",
    items: [
      { question: "When might a crown be suggested instead of a filling?", answer: "A crown may be considered when a tooth needs more coverage or support than a filling can provide. Your dentist can explain the choices after an examination." },
      { question: "Are fillings and crowns permanent?", answer: "Restorations can last for different lengths of time and may need repair or replacement. Their lifespan depends on the tooth, materials, bite and care." },
    ],
  },
  {
    title: "Cosmetic dentistry",
    items: [
      { question: "Can whitening change the colour of a crown or filling?", answer: "No. Whitening changes natural tooth shade, not the colour of existing restorations. Discuss this before starting treatment." },
      { question: "Are veneers suitable for everyone?", answer: "No. Oral health, tooth condition, bite and expectations are considered. Veneers may involve permanent changes to tooth structure." },
    ],
  },
  {
    title: "Insurance enquiries",
    items: [
      { question: "Can the clinic advise about insurance?", answer: "Please call the clinic before your visit to ask what documentation or payment information may be available. Coverage and reimbursement are determined by your insurer." },
      { question: "Will insurance cover my treatment?", answer: "Coverage depends on your individual policy and insurer. Confirm benefits directly with your insurance provider before treatment." },
    ],
  },
];

export interface GalleryImage {
  src: string;
  fallback: string;
  alt: string;
  title: string;
  category: "Clinic" | "Treatments" | "Smile Gallery" | "Children & Family";
}

export const galleryImages: GalleryImage[] = [
  { src: "/c1.png", fallback: photos.clinic, alt: "A photograph of the Simply Smilez Dental clinic.", title: "Simply Smilez Dental", category: "Clinic" },
  { src: photos.hero, fallback: photos.consultation, alt: "Illustrative stock photograph of a dentist talking with a patient.", title: "Care begins with a conversation", category: "Treatments" },
  { src: photos.child, fallback: photos.childCheckup, alt: "Illustrative stock photograph of a child and parent at a dental consultation.", title: "A visit for the whole family", category: "Children & Family" },
  { src: photos.adultSmile, fallback: photos.naturalSmile, alt: "Illustrative stock photograph of an adult smiling; not a treatment result.", title: "A smile, naturally", category: "Smile Gallery" },
  { src: "/c2.png", fallback: photos.clinicChair, alt: "A photograph of the Simply Smilez Dental clinic.", title: "Inside the practice", category: "Clinic" },
  { src: photos.dentalModel, fallback: photos.alignment, alt: "Illustrative stock photograph of a dentist explaining a tooth model.", title: "Understanding your options", category: "Treatments" },
  { src: photos.childCheckup, fallback: photos.child, alt: "Illustrative stock photograph of a child having a dental check-up.", title: "Growing smiles", category: "Children & Family" },
  { src: "/c3.png", fallback: photos.consultation, alt: "A photograph of the Simply Smilez Dental clinic.", title: "A welcoming space for care", category: "Clinic" },
  { src: photos.naturalSmile, fallback: photos.adultSmile, alt: "Illustrative stock photograph of an adult smiling; not a treatment result.", title: "Every smile is individual", category: "Smile Gallery" },
  { src: photos.veneers, fallback: photos.treatment, alt: "Illustrative stock photograph related to cosmetic dental care.", title: "Considering cosmetic care", category: "Treatments" },
  { src: photos.dentalCare, fallback: photos.dentalTablet, alt: "Illustrative stock photograph of a patient discussing dental care.", title: "A little more clarity", category: "Treatments" },
  { src: photos.child, fallback: photos.childCheckup, alt: "Illustrative stock photograph of a parent and child speaking with a dentist.", title: "Care for children and parents", category: "Children & Family" },
  { src: "/c4.png", fallback: photos.clinic, alt: "A photograph of the Simply Smilez Dental clinic.", title: "A closer look at the clinic", category: "Clinic" },
];

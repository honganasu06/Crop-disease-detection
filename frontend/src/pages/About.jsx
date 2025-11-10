import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Data Collection & Preparation',
      image: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=5B9BD5&color=fff&size=128',
      description: 'Responsible for gathering and preprocessing the PlantVillage dataset.',
    },
    {
      name: 'Sarah Williams',
      role: 'AI Model Development',
      image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=7FB3B8&color=fff&size=128',
      description: 'Designed and trained the CNN model for disease classification.',
    },
    {
      name: 'Michael Chen',
      role: 'Backend & Deployment',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=B8A9D9&color=fff&size=128',
      description: 'Built the Flask API and deployed the application infrastructure.',
    },
    {
      name: 'Emily Davis',
      role: 'Frontend Development',
      image: 'https://ui-avatars.com/api/?name=Emily+Davis&background=8DBDE1&color=fff&size=128',
      description: 'Created the React interface with modern UI/UX design.',
    },
  ];

  const technologies = [
    { name: 'React', icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
        <path d="M12 2c2 0 4 4 4 10s-2 10-4 10-4-4-4-10 2-10 4-10z" strokeWidth="1" />
      </svg>
    ) },
    { name: 'TensorFlow', icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="1" />
        <path d="M8 8h8v8H8z" strokeWidth="0.5" />
      </svg>
    ) },
    { name: 'Flask', icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 3h12l-2 7a6 6 0 11-8 0L6 3z" strokeWidth="1" />
      </svg>
    ) },
    { name: 'TailwindCSS', icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M2 12c4-6 8-6 12 0 4-6 8-6 8 0" strokeWidth="1.2" />
      </svg>
    ) },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="site-h1 mb-4 text-center">
            <span className="text-gradient">About AgriVision</span>
          </h1>
          <p className="lead">
            Empowering farmers with AI-powered crop disease detection
          </p>

          {/* Mission */}
          <div className="max-w-3xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mission
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                AgriVision is an AI-powered solution designed to help farmers detect crop diseases early, 
                protecting their harvest and ensuring food security. Our mission is to make advanced 
                agricultural technology accessible to farmers worldwide, enabling them to make informed 
                decisions and maximize their crop yields.
              </p>
            </motion.div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="site-h2 mb-4 text-center text-neutral-800 dark:text-white"
            >
              Technology Stack
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="card-glass text-center"
                >
                  <div className="mb-3">{tech.icon}</div>
                  <h3 className="text-base font-semibold text-neutral-800 dark:text-white">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="site-h2 mb-4 text-center text-neutral-800 dark:text-white"
            >
              Our Team
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card-glass text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary/30 object-cover"
                  />
                  <h3 className="text-base font-bold text-neutral-800 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-secondary mb-2 font-medium">{member.role}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { value: '38+', label: 'Disease Classes', colorClass: 'text-primary' },
              { value: '95%+', label: 'Accuracy', colorClass: 'text-secondary' },
              { value: '< 3s', label: 'Detection Time', colorClass: 'text-accent' },
            ].map((stat, index) => (
              <div key={index} className="card-glass text-center">
                <div className={`stat-value-large font-bold ${stat.colorClass} mb-2`}>{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

/**
 * Comprehensive Technical Skills Database
 * This file contains categorized lists of technical skills for the resume builder
 */

export const TECHNICAL_SKILLS = {
  programmingLanguages: [
    'C',
    'C++',
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'PHP',
    'Ruby',
    'Swift',
    'Kotlin',
    'Objective-C',
    'Go (Golang)',
    'Rust',
    'Dart',
    'R',
    'MATLAB',
    'Perl',
    'Scala',
    'Haskell',
    'Lua',
    'Julia',
    'Shell Scripting',
    'PowerShell',
    'Assembly',
    'C#'
  ],

  webTechnologies: [
    'HTML5',
    'CSS3',
    'SASS / SCSS',
    'LESS',
    'Tailwind CSS',
    'Bootstrap',
    'Materialize',
    'WebAssembly',
    'XML',
    'JSON',
    'AJAX',
    'WebSockets',
    'REST API',
    'GraphQL',
    'WebRTC'
  ],

  frameworksLibraries: [
    'React.js',
    'Angular',
    'Vue.js',
    'Svelte',
    'jQuery',
    'Alpine.js',
    'Next.js',
    'Nuxt.js',
    'Remix',
    'Node.js',
    'Express.js',
    'Django',
    'Flask',
    'FastAPI',
    'Spring Boot (Java)',
    'Ruby on Rails',
    'Laravel (PHP)',
    'CodeIgniter (PHP)',
    'ASP.NET Core',
    'Koa.js',
    'NestJS',
    'Phoenix (Elixir)',
    'React Native',
    'Flutter',
    'Ionic',
    'Xamarin',
    'TensorFlow',
    'PyTorch',
    'Keras',
    'Pandas',
    'NumPy',
    'SciPy',
    'Scikit-learn',
    'Matplotlib',
    'Seaborn',
    'OpenCV',
    'Unity (C#)',
    'Unreal Engine (C++)',
    'Phaser.js',
    'Godot'
  ],

  databases: [
    'MySQL',
    'PostgreSQL',
    'SQLite',
    'Microsoft SQL Server',
    'Oracle Database',
    'MariaDB',
    'MongoDB',
    'Cassandra',
    'CouchDB',
    'DynamoDB',
    'Neo4j (Graph DB)',
    'Redis',
    'Firebase Realtime Database',
    'Firestore',
    'Elasticsearch',
    'Solr'
  ],

  toolsPlatforms: [
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Travis CI',
    'CircleCI',
    'Postman',
    'Swagger / OpenAPI',
    'Figma',
    'Adobe XD',
    'VS Code',
    'IntelliJ IDEA',
    'Eclipse',
    'PyCharm',
    'Android Studio',
    'Xcode',
    'Postgres pgAdmin',
    'MySQL Workbench'
  ],

  cloudHosting: [
    'AWS',
    'Google Cloud Platform',
    'Microsoft Azure',
    'Heroku',
    'Netlify',
    'Vercel',
    'DigitalOcean',
    'Linode',
    'Render',
    'Cloudflare'
  ],

  otherTechnical: [
    'APIs',
    'CI/CD Pipelines',
    'Microservices Architecture',
    'Web Security',
    'Jest',
    'Mocha',
    'Chai',
    'Jasmine',
    'Selenium',
    'Cypress',
    'Puppeteer',
    'JUnit',
    'PyTest',
    'Terraform',
    'Ansible',
    'Chef',
    'Puppet',
    'Hadoop',
    'Apache Spark',
    'Kafka',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Reinforcement Learning',
    'Linux',
    'Windows',
    'macOS',
    'VMware',
    'VirtualBox'
  ]
};

/**
 * Get all skills from a specific category
 * @param {string} category - The skill category
 * @returns {Array} Array of skills in the category
 */
export const getSkillsByCategory = (category) => {
  return TECHNICAL_SKILLS[category] || [];
};

/**
 * Get all skill categories
 * @returns {Array} Array of category names
 */
export const getSkillCategories = () => {
  return Object.keys(TECHNICAL_SKILLS);
};

/**
 * Search skills across all categories
 * @param {string} searchTerm - Term to search for
 * @returns {Object} Object with categories as keys and matching skills as values
 */
export const searchSkills = (searchTerm) => {
  const results = {};
  const term = searchTerm.toLowerCase();
  
  Object.keys(TECHNICAL_SKILLS).forEach(category => {
    const matches = TECHNICAL_SKILLS[category].filter(skill => 
      skill.toLowerCase().includes(term)
    );
    if (matches.length > 0) {
      results[category] = matches;
    }
  });
  
  return results;
};

/**
 * Get formatted category names for display
 * @returns {Object} Object mapping category keys to display names
 */
export const getCategoryDisplayNames = () => {
  return {
    programmingLanguages: 'Programming Languages',
    webTechnologies: 'Web Technologies',
    frameworksLibraries: 'Frameworks and Libraries',
    databases: 'Databases',
    toolsPlatforms: 'Tools and Platforms',
    cloudHosting: 'Cloud and Hosting',
    otherTechnical: 'Other Technical Skills'
  };
};

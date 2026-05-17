import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { mockRobots } from '../../data/robots';

const SITE_URL = 'https://nexus-robotics-japan.vercel.app';
const SITE_NAME = 'Nexus Robotics Japan';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

type SeoMeta = {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  robots?: string;
  type?: 'website' | 'product';
  structuredData?: Record<string, unknown>[];
};

const defaultDescription =
  'Nexus Robotics Japan helps enterprises discover, compare, and connect with verified global robotics manufacturers through AI matching, procurement intelligence, and Japan support visibility.';

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const baseStructuredData = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description: defaultDescription,
    areaServed: 'Japan',
    knowsAbout: [
      'Robotics procurement',
      'Autonomous mobile robots',
      'Industrial automation',
      'Warehouse automation',
      'Robot manufacturer verification',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/marketplace?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

const routeMap: Record<string, SeoMeta> = {
  '/': {
    title: "Global Robotics Intelligence for Japan's Automation Future | Nexus Robotics Japan",
    description:
      'Discover, compare, and connect with verified global robotics manufacturers through structured data, deployment insight, and intelligent matching for Japan.',
    keywords:
      'robotics intelligence Japan, robotics procurement platform, verified robot manufacturers, Japan automation future, industrial robots Japan',
    canonicalPath: '/',
  },
  '/marketplace': {
    title: 'Verified Robotics Solutions Registry | Nexus Robotics Japan',
    description:
      'Search and filter verified AMRs, cobots, inspection robots, palletizing systems, and facility automation solutions with Japan support visibility.',
    keywords:
      'robot marketplace Japan, AMR registry, cobot comparison, palletizing robots Japan, robotics solutions registry',
    canonicalPath: '/marketplace',
  },
  '/matching': {
    title: 'AI Robot Matching Engine | Nexus Robotics Japan',
    description:
      'Translate facility requirements into ranked robotics recommendations using payload, industry, deployment, integration, and Japan support constraints.',
    keywords:
      'AI robot matching, robotics recommendation engine, warehouse automation matching, robot procurement AI, Japan robotics fit',
    canonicalPath: '/matching',
  },
  '/compare': {
    title: 'Robotics Procurement Compare Tool | Nexus Robotics Japan',
    description:
      'Compare robotics solutions by payload, deployment time, Japan support, pricing logic, ROI baseline, and integration readiness.',
    keywords: 'robot comparison tool, robotics procurement matrix, compare AMR robots, compare industrial robots',
    canonicalPath: '/compare',
    robots: 'noindex,follow',
  },
  '/dashboard': {
    title: 'Japan Robotics Market Intelligence Dashboard | Nexus Robotics Japan',
    description:
      'Explore robotics deployment trends, vendor coverage, support readiness, and procurement signals for the Japanese automation market.',
    keywords: 'robotics dashboard Japan, automation market intelligence, robotics analytics, Japan support coverage',
    canonicalPath: '/dashboard',
  },
  '/resources': {
    title: 'Robotics Procurement Resources & Guides | Nexus Robotics Japan',
    description:
      'Preview procurement guides, readiness checklists, safety certification explainers, and robotics market reports for Japanese enterprises.',
    keywords: 'robotics procurement guide, automation readiness checklist, robot safety certification, robotics whitepaper',
    canonicalPath: '/resources',
  },
  '/inquiry': {
    title: 'Request Robotics Manufacturer Introduction | Nexus Robotics Japan',
    description:
      'Submit a structured B2B robotics procurement inquiry for manufacturer introduction, facility review, deployment constraints, and budget planning.',
    keywords: 'robot manufacturer introduction, robotics procurement inquiry, Japan robot integrator, automation request',
    canonicalPath: '/inquiry',
  },
  '/manufacturers': {
    title: 'Verified Robotics Manufacturer Network | Nexus Robotics Japan',
    description:
      'Review global robotics manufacturers, Japan readiness, support details, certifications, deployment stats, and listed robot solutions.',
    keywords: 'verified robot manufacturers, robotics partner network, Japan robotics support, global robotics vendors',
    canonicalPath: '/manufacturers',
  },
  '/about': {
    title: 'About Nexus Robotics Japan | Trusted Robotics Procurement Intelligence',
    description:
      'Learn how Nexus Robotics Japan connects Japanese enterprises with verified global robotics manufacturers and structured procurement intelligence.',
    keywords: 'about Nexus Robotics Japan, robotics procurement trust, Japan automation access, robot manufacturer verification',
    canonicalPath: '/about',
  },
  '/saved': {
    title: 'Procurement Shortlist | Nexus Robotics Japan',
    description:
      'Review locally saved robotics solutions for procurement comparison and manufacturer introduction planning.',
    keywords: 'robotics shortlist, saved robots, procurement shortlist',
    canonicalPath: '/saved',
    robots: 'noindex,follow',
  },
};

const robotMeta = (pathname: string): SeoMeta | undefined => {
  const robotId = pathname.split('/')[2];
  const robot = mockRobots.find((item) => item.id === robotId);

  if (!robot) return undefined;

  const support = robot.japanSupport ? 'with Japan support visibility' : 'with support pathway review required';
  const canonicalPath = `/robot/${robot.id}`;

  return {
    title: `${robot.name} ${robot.category} Procurement Dashboard | Nexus Robotics Japan`,
    description: `${robot.name} by ${robot.manufacturer} is a ${robot.category} for ${robot.bestFor.toLowerCase()} Payload ${robot.payloadKg}kg, deployment ${robot.deploymentWeeks} weeks, ${support}.`,
    keywords: `${robot.name}, ${robot.manufacturer}, ${robot.category}, robotics procurement, ${robot.industries.join(', ')}, Japan robotics`,
    canonicalPath,
    type: 'product',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: robot.name,
        description: robot.shortDescription,
        image: robot.image,
        brand: {
          '@type': 'Brand',
          name: robot.manufacturer,
        },
        category: robot.category,
        countryOfOrigin: robot.manufacturerCountry,
        url: `${SITE_URL}${canonicalPath}`,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'JPY',
          lowPrice: robot.priceMinJPY,
          highPrice: robot.priceMaxJPY,
          offerCount: 1,
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${canonicalPath}`,
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Payload capacity', value: `${robot.payloadKg} kg` },
          { '@type': 'PropertyValue', name: 'Deployment time', value: `${robot.deploymentWeeks} weeks` },
          { '@type': 'PropertyValue', name: 'Japan support', value: robot.japanSupport ? 'Available' : 'Partner review required' },
          { '@type': 'PropertyValue', name: 'Certifications', value: robot.certifications.join(', ') },
          { '@type': 'PropertyValue', name: 'Integration types', value: robot.integrationTypes.join(', ') },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Registry', item: `${SITE_URL}/marketplace` },
          { '@type': 'ListItem', position: 3, name: robot.name, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  };
};

const notFoundMeta: SeoMeta = {
  title: 'Page Not Found | Nexus Robotics Japan',
  description: 'The requested Nexus Robotics Japan page could not be found.',
  keywords: 'Nexus Robotics Japan',
  canonicalPath: '/',
  robots: 'noindex,follow',
};

const getRouteMeta = (pathname: string) => {
  if (pathname.startsWith('/robot/')) return robotMeta(pathname) || notFoundMeta;
  return routeMap[pathname] || notFoundMeta;
};

export const RouteSEO = () => {
  const location = useLocation();
  const meta = useMemo(() => getRouteMeta(location.pathname), [location.pathname]);

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
    const robots = meta.robots || 'index,follow,max-image-preview:large';
    const socialTitle = meta.title.replace(` | ${SITE_NAME}`, '');

    document.title = meta.title;
    setCanonical(canonicalUrl);

    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:type"]', 'property', 'og:type', meta.type || 'website');
    setMeta('meta[property="og:title"]', 'property', 'og:title', socialTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_IMAGE);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', socialTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_IMAGE);

    let script = document.getElementById('nexus-route-jsonld') as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = 'nexus-route-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify([...baseStructuredData(), ...(meta.structuredData || [])]);
  }, [meta]);

  return null;
};

import frimousseLogo from '../img/frimousse/frimousse.png';
import primeTimeLogo from '../img/primeTime/primeTime.png';
import addeektLogo from '../img/addeekt/addeekt.png';
import mamieCouscousLogo from '../img/mamieCouscous/mamieCouscous.png';
import anotherChefLogo from '../img/anotherChef/anotherChef.png';
import thalesLogo from '../img/thales/thales.png';
import pepperSiteLogo from '../img/pepperSite/pepperSite.svg';
import lylWebsiteLogo from '../img/lylWebsite/lylWebsite.png';
import aigle5Logo from '../img/businessGeografic/businessGeografic.png';
import ligLogo from '../img/edit2/lig.png';
import kimoknowLogo from '../img/kimoknow/kimoknow.png';
import hashTagNoteLogo from '../img/hashTagNote/hashTagNote.png';
import aigleScreen1 from '../img/businessGeografic/screenshots/aigle1.png';
import aigleScreen2 from '../img/businessGeografic/screenshots/aigle2.png';
import anotherChefScreen1 from '../img/anotherChef/screenshots/anotherChef1.png';
import anotherChefScreen2 from '../img/anotherChef/screenshots/anotherChef2.png';
import anotherChefScreen3 from '../img/anotherChef/screenshots/anotherChef4.png';
import hashTagNoteScreen1 from '../img/hashTagNote/screenshots/screen1.jpg';
import hashTagNoteScreen2 from '../img/hashTagNote/screenshots/screen2.jpg';
import hashTagNoteScreen3 from '../img/hashTagNote/screenshots/screen3.jpg';
import hashTagNoteScreen4 from '../img/hashTagNote/screenshots/screen4.jpg';
import mccScreen1 from '../img/mamieCouscous/screenshots/mcc1.png';
import mccScreen2 from '../img/mamieCouscous/screenshots/mcc2.png';
import mccScreen3 from '../img/mamieCouscous/screenshots/mcc3.png';
import mccScreen4 from '../img/mamieCouscous/screenshots/mcc4.png';
import frimousseScreen1 from '../img/frimousse/screenshots/frimousse1.jpeg';
import frimousseScreen2 from '../img/frimousse/screenshots/frimousse2.jpeg';
import frimousseScreen3 from '../img/frimousse/screenshots/frimousse3.jpeg';
import frimousseScreen4 from '../img/frimousse/screenshots/frimousse4.jpeg';
import frimousseScreen5 from '../img/frimousse/screenshots/frimousse5.jpeg';
import addeektScreen1 from '../img/addeekt/screenshots/addeektScreen7.jpeg';
import addeektScreen2 from '../img/addeekt/screenshots/addeektScreen2.jpeg';
import addeektScreen3 from '../img/addeekt/screenshots/addeektScreen5.jpeg';
import addeektScreen4 from '../img/addeekt/screenshots/addeektScreen6.jpeg';
import addeektScreen5 from '../img/addeekt/screenshots/addeektScreen3.jpeg';
import addeektScreen6 from '../img/addeekt/screenshots/addeektScreen1.png';

class PortfolioService {
  projects = [
    {
      id: 'primeTime',
      name: 'Prime Time',
      shortDescription: 'Android App + Web App & Node.js Backend',
      description: 'Mobile app displaying a live stream where a host ask questions that players can answer live with the app (like HQ Trivia).',
      image: primeTimeLogo,
      role: 'CREATOR / DEV.',
      date: '2018',
      techs: [
        'android', 'js', 'react-native', 'angular', 'node', 'html5', 'css3',
      ],
    },
    {
      id: 'frimousse',
      name: 'Frimousse',
      shortDescription: 'Android + iOS App',
      description: 'Frimousse is a mobile application that makes cats speak in Augmented Reality. Using Artificial Intelligence to detect cats.',
      image: frimousseLogo,
      screenshots: [
        {src: frimousseScreen1, type: 'img'}, {src: frimousseScreen2, type: 'img'},
        {src: frimousseScreen3, type: 'img'}, {src: frimousseScreen4, type: 'img'},
        {src: frimousseScreen5, type: 'img'},
      ],
      role: 'DEV.',
      date: '2017',
      techs: [
        'ios', 'android', 'js', 'react-native', 'java', 'tensorflow',
      ],
      links: [
        {
          type: 'website',
          url: 'https://frimousse.co',
        },
        {
          type: 'android',
          url: 'https://play.google.com/store/apps/details?id=com.mvpstars.frimousse',
        },
        {
          type: 'ios',
          url: 'https://itunes.apple.com/app/id1317338413',
        },
      ],
    },
    {
      id: 'mamieCouscous',
      name: 'Mamie Couscous',
      shortDescription: 'Web App + Play! Backend',
      description: 'Ecommerce website selling organic couscous with a strong solidarity approach.',
      image: mamieCouscousLogo,
      screenshots: [
        {src: mccScreen1, type: 'img'}, {src: mccScreen2, type: 'img'},
        {src: mccScreen3, type: 'img'}, {src: mccScreen4, type: 'img'},
      ],
      role: 'CTO',
      date: '2017-Present',
      techs: [
        'js', 'react', 'play', 'scala', 'mongoDB', 'html5', 'css3',
      ],
      links: [
        {
          type: 'website',
          url: 'https://mamiecouscous.com',
        },
      ],
    },
    {
      id: 'hashTagNote',
      name: 'HashTagNote',
      shortDescription: 'Android App',
      description: 'HashTagNote is a mobile app to take notes with hashtags to easily recover them.',
      image: hashTagNoteLogo,
      screenshots: [
        {src: hashTagNoteScreen1, type: 'img'}, {src: hashTagNoteScreen2, type: 'img'},
        {src: hashTagNoteScreen3, type: 'img'}, {src: hashTagNoteScreen4, type: 'img'},
      ],
      role: 'CREATOR / DEV.',
      date: '2017-Present',
      techs: [
        'android', 'js', 'react-native',
      ],
      links: [
        {
          type: 'android',
          url: 'https://play.google.com/store/apps/details?id=com.hashtagnote',
        },
      ],
    },
    {
      id: 'addeekt',
      name: 'Addeekt Android',
      shortDescription: 'Android App',
      description: 'Mobile app which is a social network where fans can follow their favorites celebs and have all their social networks content in one place.',
      image: addeektLogo,
      role: 'LEAD DEV.',
      date: '2017',
      techs: [
        'android', 'js', 'react-native',
      ],
      screenshots: [
        {src: addeektScreen1, type: 'img'}, {src: addeektScreen2, type: 'img'},
        {src: addeektScreen3, type: 'img'}, {src: addeektScreen4, type: 'img'},
        {src: addeektScreen5, type: 'img'}, {src: addeektScreen6, type: 'img'},
      ],
      links: [
        {
          type: 'website',
          url: 'https://addeekt.com',
        },
        {
          type: 'ios',
          url: 'https://itunes.apple.com/us/app/addeekt/id1180518275',
        },
      ],
    },
    {
      id: 'anotherChef',
      name: 'AnotherChef',
      shortDescription: 'Web App + Play! Backend',
      description: 'Ecommerce website where customers can organize a meal with a private chef.',
      image: anotherChefLogo,
      screenshots: [
        {src: anotherChefScreen1, type: 'img'}, {src: anotherChefScreen2, type: 'img'},
        {src: anotherChefScreen3, type: 'img'},
      ],
      role: 'DEV.',
      date: '2017',
      techs: [
        'js', 'react', 'scala', 'mongoDB', 'html5', 'css3',
      ],
      links: [
        {
          type: 'website',
          url: 'https://anotherchef.com',
        },
      ],
    },
    {
      id: 'thales',
      name: 'Electronic Warfare',
      shortDescription: 'Windows Software + Multiple Servers',
      description: 'Electronic warfare software to help militaries.',
      image: thalesLogo,
      role: 'DEV.',
      date: '2015-2017',
      techs: [
        'java', 'postgreSQL', 'js', 'angular', 'html5', 'css3', 'grunt',
      ],
    },
    {
      id: 'pepperSite',
      name: 'Pepper Site',
      shortDescription: 'Web App + Play! Backend',
      description: 'Website builder, letting people easily create website with a wysiwyg editor.',
      image: pepperSiteLogo,
      role: 'CO-FOUNDER / CTO',
      date: '2015',
      techs: [
        'java', 'play', 'mongoDB', 'js', 'angular', 'gulp', 'heroku', 'aws', 'html5', 'css3',
      ],
      links: [
        {
          type: 'website',
          url: 'https://www.pepper-site.com',
        },
      ],
    },
    {
      id: 'lylWebsite',
      name: 'LYL Website',
      shortDescription: 'Web App + Play! Backend',
      description: 'Website builder really easy to use targeting craftsperson and restaurateur.',
      image: lylWebsiteLogo,
      role: 'CO-FOUNDER / CTO',
      date: '2014-2015',
      techs: [
        'java', 'play', 'mongoDB', 'js', 'angular', 'gulp', 'heroku', 'aws', 'html5', 'css3',
      ],
      links: [
        {
          type: 'website',
          url: 'https://lyl.website',
        },
      ],
    },
    {
      id: 'aigle5',
      name: 'Aigle 5',
      shortDescription: 'Web App + Play! Backend',
      description: 'Web app to create complex and powerful GIS web app.',
      image: aigle5Logo,
      screenshots: [
        {src: aigleScreen1, type: 'img'}, {src: aigleScreen2, type: 'img'},
      ],
      role: 'APPRENTICE DEV.',
      date: '2013-2014',
      techs: [
        'java', 'play', 'js', 'angular', 'html5', 'css3',
      ],
      links: [
        {
          type: 'website',
          url: 'https://www.business-geografic.com/fr/geo-software/geo-technologies.html',
        },
      ],
    },
    {
      id: 'ediT2',
      name: 'EdiT2',
      shortDescription: 'Haskell Software',
      description: 'Haskell software used to dispatch persons according to multiple patterns to increase collaborative learning.',
      image: ligLogo,
      role: 'APPRENTICE DEV.',
      date: '2013',
      techs: [
        'haskell',
      ],
      links: [
        {
          type: 'github',
          url: 'https://github.com/Luze26/EdiT2-Patterns',
        },
      ],
    },
    {
      id: 'kimoknow',
      name: 'Kimoknow',
      shortDescription: 'Web App + Zend Backend',
      description: 'Web platform allowing users within an organization to share and discuss ideas.',
      image: kimoknowLogo,
      role: 'APPRENTICE DEV.',
      date: '2011',
      techs: [
        'java', 'neo4j', 'php', 'zf', 'jQuery', 'html', 'css',
      ],
      links: [
        {
          type: 'website',
          url: 'http://www.kimoknow.com',
        },
      ],
    },
  ];

  getProjectById(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }
}

const portfolioService = new PortfolioService();
export default portfolioService;
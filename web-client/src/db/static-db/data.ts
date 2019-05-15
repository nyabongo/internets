import { ServiceProvider, Service, Plan } from '../interface';

export interface DB {
  serviceProviders: ServiceProvider[];
  services: Service[];
  plans: Plan[];
}

const data: DB = {
  serviceProviders: [
    {
      id: '1',
      name: 'Rath, Heller and Mann',
      description: 'intuitive disintermediate relationships Dolorem numquam rem corrupti in. Vel suscipit voluptates perferendis deleniti ut impedit. Numquam cum labore qui. Suscipit quia rerum. Sit est maiores harum asperiores unde quaerat beatae veritatis. Est molestiae expedita dolorum.',
      website: 'https://airtel.ug',
      banner: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Bharti_Airtel_Limited_logo.svg/1280px-Bharti_Airtel_Limited_logo.svg.png',
      logo: 'https://upload.wikimedia.org/wikipedia/en/1/14/Bharti_Airtel_Limited.svg',
    }, {
      id: '2',
      name: 'Krajcik - Haag',
      description: 'enterprise incentivize infrastructures Omnis aut qui autem velit. Porro nulla nobis voluptas quidem. Laboriosam asperiores aliquam voluptatem quidem. Quod similique ab quis consequuntur officia maxime. Amet sequi fugit amet consectetur recusandae ut qui quibusdam. Et velit culpa sed rerum.',
      website: 'https://mtn.ug',
      banner: 'https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/MTN-Logo-1024x576.jpg',
      logo: 'https://seeklogo.com/images/M/MTN-logo-459AAF9482-seeklogo.com.png',
    }, {
      id: '3',
      name: 'Hansen Group',
      description: 'customized synergize experiences Quo illo magnam et iste. Dolores modi doloremque non dolorem. Modi assumenda praesentium.',
      website: 'https://africell.ug',
      banner: 'http://www.accessgambia.com/information/large/africell-logo-1.jpg',
      logo: 'http://www.connectenterprise.ug/sites/default/files/africell.jpg',
    },
  ],
  services: [
    {
      id: '1-1',
      providerId: '1',
      name: 'Handmade Service',
      description: 'Amet amet consectetur ipsum commodo ea consectetur cupidatat commodo consectetur ullamco occaecat proident amet. Ex in proident cupidatat culpa. Enim est officia minim aliqua irure veniam sit ut. Voluptate irure minim duis id non sint aliqua aliquip. Est consectetur ullamco commodo minim dolor amet et velit nisi cillum est non sit.',
      banner: 'http://lorempixel.com/960/480/business/Handmade',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
    {
      id: '1-2',
      providerId: '1',
      name: 'Small Service',
      description: 'Pariatur sit qui irure dolore culpa enim qui. Cillum duis consequat nisi sit labore cillum officia exercitation aliqua irure nisi ea culpa ea. Mollit nisi excepteur adipisicing ipsum ullamco. Dolor id in reprehenderit eiusmod incididunt cupidatat ad. Nostrud nisi et sit nisi commodo sit excepteur irure ullamco sunt Lorem. Duis consequat aliquip enim ea duis aute consectetur tempor in laborum. Elit est ad ea deserunt sint Lorem fugiat nisi laborum exercitation in mollit.',
      banner: 'http://lorempixel.com/960/480/business/Small',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
    {
      id: '2-1',
      providerId: '2',
      name: 'Intelligent Service',
      description: 'Amet ullamco anim duis esse commodo mollit nisi id consequat ipsum enim. Ut consequat sit reprehenderit aute culpa. Adipisicing amet exercitation amet aute cupidatat non. Reprehenderit occaecat pariatur velit ullamco eiusmod labore proident ea sunt qui labore labore sit. Sunt labore sint mollit sit labore sint.',
      banner: 'http://lorempixel.com/960/480/business/Intelligent',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
    {
      id: '2-2',
      providerId: '2',
      name: 'Incredible Service',
      description: 'Anim et do do elit nostrud quis pariatur exercitation id dolor eu aute magna commodo. Pariatur laborum irure incididunt laborum voluptate nulla occaecat officia dolore elit. Occaecat deserunt ut magna Lorem eiusmod officia consequat ipsum cillum. Amet exercitation fugiat laborum incididunt est consectetur. Qui excepteur enim consequat velit aliqua consequat voluptate. Elit ad proident dolor aliqua officia cillum.',
      banner: 'http://lorempixel.com/960/480/business/Incredible',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
    {
      id: '3-1',
      providerId: '3',
      name: 'Handmade Service',
      description: 'Sint excepteur dolore consequat nulla qui aute anim magna do qui occaecat aliquip. Tempor nisi occaecat laborum duis officia mollit esse deserunt officia nisi quis laborum sunt. Quis Lorem dolor elit tempor tempor sit incididunt commodo sint dolore sunt et eu ipsum. Esse ipsum sint et eu dolor in voluptate dolor dolor Lorem tempor culpa pariatur. Proident consectetur voluptate labore ullamco aliqua nostrud laborum non irure velit adipisicing quis.',
      banner: 'http://lorempixel.com/960/480/business/3',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
    {
      id: '3-2',
      providerId: '3',
      name: 'Generic Service',
      description: 'Nulla quis cillum deserunt consectetur sit labore et cillum est pariatur ullamco mollit. Fugiat labore sint ad tempor mollit mollit magna ad consequat occaecat laboris consequat magna irure. Anim laborum cillum ipsum dolore qui nulla laborum anim aliqua laboris Lorem do. Duis sit cupidatat reprehenderit minim nisi enim in eiusmod nostrud. Nulla nulla proident commodo velit ullamco est laborum. Quis velit Lorem officia in velit. Eiusmod dolore labore qui ad proident proident sunt labore reprehenderit.',
      banner: 'http://lorempixel.com/960/480/business/Generic',
      technology: ['4G/LTE', '3G/UMTS', 'WCDMA'],
    },
  ],
  plans: [
    {
      id: '1-1-1',
      serviceId: '1-1',
      providerId: '1',
      name: 'Incredible Fresh Mouse',
      description: 'Esse mollit sit irure ut commodo ex proident.',
      price: {
        value: 466.00,
        currency: 'MDL',
        relativeMagnitude: 466.00,
      },
      volume: {
        value: 784.91,
        unit: 'MB',
        relativeMagnitude: 784.91,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '1-1-2',
      serviceId: '1-1',
      providerId: '1',
      name: 'Awesome Wooden Soap',
      description: 'Irure ad qui cupidatat sit velit voluptate dolor officia Lorem exercitation duis ea sit officia.',
      price: {
        value: 583.00,
        currency: 'HKD',
        relativeMagnitude: 583.00,
      },
      volume: {
        value: 720.73,
        unit: 'MB',
        relativeMagnitude: 720.73,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '1-1-3',
      serviceId: '1-1',
      providerId: '1',
      name: 'Refined Metal Shoes',
      description: 'Enim aute commodo amet ullamco.',
      price: {
        value: 772.00,
        currency: 'LBP',
        relativeMagnitude: 772.00,
      },
      volume: {
        value: 433.67,
        unit: 'MB',
        relativeMagnitude: 433.67,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '1-2-1',
      serviceId: '1-2',
      providerId: '1',
      name: 'Awesome Concrete Salad',
      description: 'Culpa ullamco eiusmod non ad sit adipisicing et tempor consequat dolor cupidatat aute.',
      price: {
        value: 607.00,
        currency: 'INR',
        relativeMagnitude: 607.00,
      },
      volume: {
        value: 984.58,
        unit: 'MB',
        relativeMagnitude: 984.58,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '1-2-2',
      serviceId: '1-2',
      providerId: '1',
      name: 'Fantastic Frozen Table',
      description: 'Eu laborum nostrud adipisicing consectetur exercitation.',
      price: {
        value: 282.00,
        currency: 'PHP',
        relativeMagnitude: 282.00,
      },
      volume: {
        value: 861.68,
        unit: 'MB',
        relativeMagnitude: 861.68,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '1-2-3',
      serviceId: '1-2',
      providerId: '1',
      name: 'Tasty Plastic Car',
      description: 'Qui consequat magna ad deserunt cupidatat enim occaecat velit nostrud.',
      price: {
        value: 918.00,
        currency: 'WST',
        relativeMagnitude: 918.00,
      },
      volume: {
        value: 451.35,
        unit: 'MB',
        relativeMagnitude: 451.35,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-1-1',
      serviceId: '2-1',
      providerId: '2',
      name: 'Practical Rubber Tuna',
      description: 'Irure ut tempor aliquip consequat elit exercitation deserunt ea minim et Lorem exercitation.',
      price: {
        value: 135.00,
        currency: 'TRY',
        relativeMagnitude: 135.00,
      },
      volume: {
        value: 834.73,
        unit: 'MB',
        relativeMagnitude: 834.73,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-1-2',
      serviceId: '2-1',
      providerId: '2',
      name: 'Unbranded Frozen Car',
      description: 'Magna voluptate consequat aute anim cupidatat ipsum mollit minim ut id pariatur.',
      price: {
        value: 450.00,
        currency: 'ZWL',
        relativeMagnitude: 450.00,
      },
      volume: {
        value: 406.28,
        unit: 'MB',
        relativeMagnitude: 406.28,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-1-3',
      serviceId: '2-1',
      providerId: '2',
      name: 'Intelligent Steel Bacon',
      description: 'Esse ipsum enim elit adipisicing commodo nulla eu labore sint sit quis ex.',
      price: {
        value: 605.00,
        currency: 'PGK',
        relativeMagnitude: 605.00,
      },
      volume: {
        value: 504.34,
        unit: 'MB',
        relativeMagnitude: 504.34,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-2-1',
      serviceId: '2-2',
      providerId: '2',
      name: 'Ergonomic Concrete Salad',
      description: 'Est minim mollit sint aliquip fugiat cillum.',
      price: {
        value: 458.00,
        currency: 'GYD',
        relativeMagnitude: 458.00,
      },
      volume: {
        value: 740.03,
        unit: 'MB',
        relativeMagnitude: 740.03,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-2-2',
      serviceId: '2-2',
      providerId: '2',
      name: 'Rustic Plastic Keyboard',
      description: 'Cupidatat est ea dolor adipisicing labore cupidatat aute qui enim nostrud.',
      price: {
        value: 426.00,
        currency: 'XPF',
        relativeMagnitude: 426.00,
      },
      volume: {
        value: 69.94,
        unit: 'MB',
        relativeMagnitude: 69.94,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '2-2-3',
      serviceId: '2-2',
      providerId: '2',
      name: 'Handmade Cotton Mouse',
      description: 'Incididunt labore pariatur qui ex culpa consequat.',
      price: {
        value: 290.00,
        currency: 'OMR',
        relativeMagnitude: 290.00,
      },
      volume: {
        value: 743.99,
        unit: 'MB',
        relativeMagnitude: 743.99,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-1-1',
      serviceId: '3-1',
      providerId: '3',
      name: 'Unbranded Cotton Chair',
      description: 'Occaecat commodo aliquip adipisicing magna aliquip eu laborum duis do irure consequat commodo.',
      price: {
        value: 376.00,
        currency: 'CVE',
        relativeMagnitude: 376.00,
      },
      volume: {
        value: 132.52,
        unit: 'MB',
        relativeMagnitude: 132.52,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-1-2',
      serviceId: '3-1',
      providerId: '3',
      name: 'Intelligent Rubber Car',
      description: 'Occaecat occaecat pariatur consectetur ullamco nisi.',
      price: {
        value: 303.00,
        currency: 'SLL',
        relativeMagnitude: 303.00,
      },
      volume: {
        value: 947.42,
        unit: 'MB',
        relativeMagnitude: 947.42,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-1-3',
      serviceId: '3-1',
      providerId: '3',
      name: 'Awesome Granite Keyboard',
      description: 'Ex sint qui sunt deserunt id dolor laborum consequat amet veniam do tempor occaecat.',
      price: {
        value: 689.00,
        currency: 'NPR',
        relativeMagnitude: 689.00,
      },
      volume: {
        value: 311.99,
        unit: 'MB',
        relativeMagnitude: 311.99,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-2-1',
      serviceId: '3-2',
      providerId: '3',
      name: 'Licensed Concrete Chicken',
      description: 'Labore fugiat esse laborum eiusmod duis ullamco do officia incididunt aute.',
      price: {
        value: 970.00,
        currency: 'AFN',
        relativeMagnitude: 970.00,
      },
      volume: {
        value: 463.73,
        unit: 'MB',
        relativeMagnitude: 463.73,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-2-2',
      serviceId: '3-2',
      providerId: '3',
      name: 'Sleek Rubber Keyboard',
      description: 'Ullamco reprehenderit adipisicing est incididunt reprehenderit commodo.',
      price: {
        value: 588.00,
        currency: 'JOD',
        relativeMagnitude: 588.00,
      },
      volume: {
        value: 217.51,
        unit: 'MB',
        relativeMagnitude: 217.51,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
    {
      id: '3-2-3',
      serviceId: '3-2',
      providerId: '3',
      name: 'Refined Frozen Gloves',
      description: 'Commodo Lorem sunt exercitation aliquip excepteur.',
      price: {
        value: 841.00,
        currency: 'AMD',
        relativeMagnitude: 841.00,
      },
      volume: {
        value: 680.84,
        unit: 'MB',
        relativeMagnitude: 680.84,
      },
      duration: {
        value: 1,
        unit: 'month',
        relativeMagnitude: 1,
      },
    },
  ],
};

export default data;

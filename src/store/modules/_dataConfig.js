const TITLE = {
  col1: 'brand_name',
  col2: 'marketplaces',
  col3: 'isActive',
  col4: 'actions'
}

const rawDataReports = [
  {
    [TITLE.col1]: 'Samppa Nori',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Member',
    'id': 1,
    '_rowVariant': 'success'
  },
  {
    [TITLE.col1]: 'Estavan Lykos',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Staff',
    'id': 2,
    'images': 'aaaa',
    '_rowVariant': 'danger'
  },
  {
    [TITLE.col1]: 'Chetan Mohamed',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Admin',
    '_rowVariant': 'info',
    'id': 500
  },
  {
    [TITLE.col1]: 'Derick Maximinus',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Member',
    'id': 3
  },
  {
    [TITLE.col1]: 'Friderik Dávid',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Active',
    'id': 4
  },
  {
    [TITLE.col1]: 'Yiorgos Avraamu',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Active',
    'id': 5
  },
  {
    [TITLE.col1]: 'Avram Tarasios',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Banned',
    'id': 6
  },
  {
    [TITLE.col1]: 'Quintin Ed',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Inactive',
    'id': 7
  },
  {
    [TITLE.col1]: 'Enéas Kwadwo',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Pending',
    'id': 8
  },
  {
    [TITLE.col1]: 'Agapetus Tadeáš',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Active',
    'id': 9
  },
  {
    [TITLE.col1]: 'Carwyn Fachtna',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Active',
    'id': 10
  },
  {
    [TITLE.col1]: 'Nehemiah Tatius',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Banned',
    'id': 11
  },
  {
    [TITLE.col1]: 'Ebbe Gemariah',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Inactive',
    'id': 12
  },
  {
    [TITLE.col1]: 'Eustorgios Amulius',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Pending',
    'id': 13
  },
  {
    [TITLE.col1]: 'Leopold Gáspár',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Active',
    'id': 14
  },
  {
    [TITLE.col1]: 'Pompeius René',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Active',
    'id': 15
  },
  {
    [TITLE.col1]: 'Paĉjo Jadon',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Banned',
    'id': 16
  },
  {
    [TITLE.col1]: 'Micheal Mercurius',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Inactive',
    'id': 17
  },
  {
    [TITLE.col1]: 'Ganesha Dubhghall',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: 'Member',
    [TITLE.col4]: 'Pending',
    'id': 18
  },
  {
    [TITLE.col1]: 'Hiroto Šimun',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Active',
    'id': 19
  },
  {
    [TITLE.col1]: 'Vishnu Serghei',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Active',
    'id': 20
  },
  {
    [TITLE.col1]: 'Zbyněk Phoibos',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: false,
    [TITLE.col4]: 'Banned',
    'id': 21
  },
  {
    [TITLE.col1]: 'Einar Randall',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Inactive',
    'id': 22
  },
  {
    [TITLE.col1]: 'Félix Troels',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Active',
    'id': 23
  },
  {
    [TITLE.col1]: 'Aulus Agmundr',
    [TITLE.col2]: ['Amazon', 'Google shopping'],
    [TITLE.col3]: true,
    [TITLE.col4]: 'Pending',
    'id': 24
  }
]
const marketplaces = [
  {
    title: 'Amazon',
    expanded: true,
    children: [
      {
        title: 'Authorized Sellers',
        expanded: true
      }
    ]
  },
  {
    title: 'Google Shopping',
    expanded: true
  }
]

export const promiseDataReports = new Promise((resolve, reject) =>
  resolve(rawDataReports)
)
export const promiseOneReport = new Promise((resolve, reject) =>
  resolve(rawDataReports[1])
)
export const promiseMarketplaces = new Promise((resolve, reject) =>
  resolve(marketplaces)
)

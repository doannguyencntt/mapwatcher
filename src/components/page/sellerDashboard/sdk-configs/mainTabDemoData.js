export const grm = {
  'cols': [
    {
      'name': 'total',
      'type': 'int'
    },
    {
      'name': 'gmr_status',
      'type': 'string'
    }],
  'rows': [
    [99, 'gmr'],
    [300, 'non_gmr']
  ]
}
export const arbitrage = {
  'cols': [
    {
      'name': '_id',
      'type': 'objectId'
    },
    {
      'name': 'arbitrage_status',
      'type': 'string'
    },
    {
      'name': 'complete_status',
      'type': 'string'
    },
    {
      'name': 'date',
      'type': 'date'
    },
    {
      'name': 'gmr_status',
      'type': 'string'
    },
    {
      'name': 'investigation',
      'type': 'string'
    },
    {
      'name': 'link',
      'type': 'string'
    },
    {
      'name': 'merchant_id',
      'type': 'string'
    },
    {
      'name': 'seller_name',
      'type': 'string'
    },
    {
      'name': 'short_status',
      'type': 'string'
    },
    {
      'name': 'source',
      'type': 'string'
    },
    {
      'name': 'status',
      'type': 'string'
    },
    {
      'name': 'total',
      'type': 'int'
    },
    {
      'name': 'week',
      'type': 'string'
    }],
  'rows': [
    ['5e9593c0729f70001211a156', 'non_arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 4/7/19', 'https://drive.google.com/file/d/1aZOPYhzph5bJ6t_CcsHWKJLrUIh7I2Mq/view?usp=sharing', 'A2QIQUAPI6XSTT', 'Shoe Brands USA', 'rogue', 'Possible GMR', 'Still rogue', 15, '2020 W16'],
    ['5e9593c0729f70001211a157', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 4/29/19', 'https://drive.google.com/file/d/10ZV2nDZjcckZiICNMrmOej3y4SKwCwhw/view?usp=sharing', 'A3B3XKFL4HJA0A', 'M Emporium', 'rogue', 'Arbitrage', 'Still rogue', 80, '2020 W16'],
    ['5e9593c0729f70001211a158', 'non_arbitrage', 'not_complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation In Progress', 'https://drive.google.com/file/d/10ZV2nDZjcckZiICNMrmOej3y4SKwCwhw/view?usp=sharing', 'A2ZTI1H04KFBGE', 'Mountain Peak Gear', 'rogue', 'Possible GMR', 'Still rogue', 20, '2020 W16'],
    ['5e9593c0729f70001211a159', 'non_arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 7/1/19', 'https://drive.google.com/file/d/14AiDBdU3cRtOlCF4QKrFLBrIvIOkYtJT/view', 'AZ8NEMW6QEWVL', 'Next thing', 'rogue', 'Likely GMR', 'Still rogue', 21, '2020 W16'],
    ['5e9593c0729f70001211a15a', 'non_arbitrage', 'not_complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation In Progress', 'https://drive.google.com/file/d/14AiDBdU3cRtOlCF4QKrFLBrIvIOkYtJT/view', 'A3HYEUQU9RD6WD', 'ArnoldTstore', 'rogue', 'Possible GMR', 'Still rogue', 38, '2020 W16'],
    ['5e9593c0729f70001211a15b', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 12/5/19', 'https://drive.google.com/open?id=1a5uvUmpfOlicxSORDgpc6x-tMw_tdQBc', 'A4PZJUL3NQANM', 'BWP Sales', 'rogue', 'Arbitrage', 'Still rogue', 30, '2020 W16'],
    ['5e9593c0729f70001211a15c', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 6/25/19', 'https://drive.google.com/open?id=1-iBDbJNdVKwKAYkL1Ry2JDvdx_M0pwHl', 'A2N0N8DMYB9VWG', 'Our Best choice', 'rogue', 'Arbitrage', 'Still rogue', 27, '2020 W16'],
    ['5e9593c0729f70001211a15d', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 12/16/18', 'https://drive.google.com/file/d/1ml7qCg6o_wjrhWJxO5uv-6kodaN4pP5A/view?usp=sharing', 'A91ZOJK70CM4K', 'L.J. Enterprise', 'rogue', 'Arbitrage', 'Still rogue', 58, '2020 W16'],
    ['5e9593c0729f70001211a15e', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 1/2/20', 'https://drive.google.com/open?id=1WjMMdTtRBn6tW__GKQO-Tq2UY8a-t-jB', 'A3I8FJ4SUZTJQM', 'eComical', 'rogue', 'Arbitrage', 'Still rogue', 41, '2020 W16'],
    ['5e9593c0729f70001211a15f', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 10/15/18', 'https://drive.google.com/file/d/1A388Kg1sN0eDLm0nunjUxw-80jGgVkJt/view?usp=sharing', 'A186DGSO12GK7X', 'The BIG Outdoor Store', 'rogue', 'Arbitrage', 'Still rogue', 3, '2020 W16'],
    ['5e9593c0729f70001211a160', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 10/15/18', 'https://drive.google.com/file/d/1x8C394wS9qesRCObr28UaI2zGxaO5H04/view?usp=sharing', 'AQ0G1LRTF7R6I', 'PairMySole', 'relisted', 'Arbitrage', 'relisted', 34, '2020 W16'],
    ['5e9593c0729f70001211a161', 'non_arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'gmr', 'Investigation Complete Sent 10/15/18', 'https://drive.google.com/file/d/1Q-czo1DHhThXSk-6CHCljmQDariG-T7o/view?usp=sharing', 'A3TEPX5G6QOPGD', 'Deals Warrior', 'rogue', 'GMR: VAMPS NYC', 'GMR still rogue', 0, '2020 W16'],
    ['5e9593c0729f70001211a162', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 2/20/19', 'https://drive.google.com/file/d/1QKnmdbeHPCdBh1BTEi39AUZLYGZsG7Mu/view?usp=sharing', 'AUS3RKSBVQLG5', 'ClearPlanet', 'rogue', 'Arbitrage', 'Still rogue', 19, '2020 W16'],
    ['5e9593c0729f70001211a163', 'non_arbitrage', 'not_complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation In Progress', 'https://drive.google.com/file/d/1QKnmdbeHPCdBh1BTEi39AUZLYGZsG7Mu/view?usp=sharing', 'A18CSJ2LZSL8WZ', 'Rystinworks', 'rogue', 'Possible GMR', 'Still rogue', 5, '2020 W16'],
    ['5e9593c0729f70001211a164', 'arbitrage', 'complete', '2020-04-14T00:00:00.000Z', 'non_gmr', 'Investigation Complete Sent 1/9/20', 'https://drive.google.com/open?id=1AH1QXJ-xU2j7sbS_HhVrVngXrsZiFncb', 'A7XGOMQ7T0UTQ', 'Miles of Stuff', 'rogue', 'Arbitrage', 'Still rogue', 8, '2020 W16']
  ]
}
export const sellerStatus = {
  'cols': [
    {
      'name': 'total',
      'type': 'int'
    },
    {
      'name': 'investigation',
      'type': 'string'
    },
    {
      'name': 'date',
      'type': 'date'
    }],
  'rows': [
    [8, 'Investigation Complete Sent 1/9/20', '2020-04-14T00:00:00.000Z'],
    [63, 'Investigation In Progress', '2020-04-14T00:00:00.000Z'],
    [80, 'Investigation Complete Sent 4/29/19', '2020-04-14T00:00:00.000Z'],
    [30, 'Investigation Complete Sent 12/5/19', '2020-04-14T00:00:00.000Z'],
    [21, 'Investigation Complete Sent 7/1/19', '2020-04-14T00:00:00.000Z'],
    [15, 'Investigation Complete Sent 4/7/19', '2020-04-14T00:00:00.000Z'],
    [37, 'Investigation Complete Sent 10/15/18', '2020-04-14T00:00:00.000Z'],
    [27, 'Investigation Complete Sent 6/25/19', '2020-04-14T00:00:00.000Z'],
    [58, 'Investigation Complete Sent 12/16/18', '2020-04-14T00:00:00.000Z'],
    [41, 'Investigation Complete Sent 1/2/20', '2020-04-14T00:00:00.000Z']
  ]
}
export const completion = {
  'cols': [{
    'name': 'total',
    'type': 'int'
  }, { 'name': 'complete_status', 'type': 'string' }],
  'rows': [[34, 'relisted'], [365, 'rogue']]
}
export const totalListing = {
  'cols': [
    {
      'name': 'total',
      'type': 'int'
    },
    {
      'name': 'date',
      'type': 'date'
    }
  ],
  'rows': [
    [231, '2020-04-21T00:00:00.000Z'],
    [79, '2020-04-24T00:00:00.000Z'],
    [13, '2020-04-28T00:00:00.000Z'],
    [298, '2020-05-02T00:00:00.000Z'],
    [319, '2020-05-09T00:00:00.000Z']
  ]
}
export const compliedRogue = {
  'cols': [
    {
      'name': 'total',
      'type': 'int'
    },
    {
      'name': 'short_status',
      'type': 'string'
    }
  ],
  'rows': [
    [34, 'Rogue'],
    [365, 'Complied']
  ]
}

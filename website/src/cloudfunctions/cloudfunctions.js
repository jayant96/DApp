Moralis.Cloud.define('getHoldersByDay', async (request) => {
  const pipelineDates = [
    {
      group: {
        objectId: null,
        minDate: { $min: '$block_timestamp' },
        maxDate: { $max: '$block_timestamp' },
      },
    },
    {
      project: {
        objectId: false,
        minDate: { $dateToString: { format: '%Y-%m-%d', date: '$minDate' } },
        maxDate: { $dateToString: { format: '%Y-%m-%d', date: '$maxDate' } },
      },
    },
  ]

  const pipelineGroup = [
    {
      project: {
        date: {
          $dateToString: { format: '%Y-%m-%d', date: '$block_timestamp' },
        },
        data: [
          {
            owner: '$to',
            change: 1,
          },
          {
            owner: '$from',
            change: -1,
          },
        ],
      },
    },
    {
      unwind: '$data',
    },
    {
      match: {
        $and: [
          {
            'data.owner': { $ne: '0x0000000000000000000000000000000000000000' },
          },
          {
            'data.owner': { $ne: '0x000000000000000000000000000000000000dead' },
          },
        ],
      },
    },
    {
      group: {
        objectId: {
          date: '$date',
          owner: '$data.owner',
        },
        changeOnDay: { $sum: '$data.change' },
      },
    },
    {
      project: {
        objectId: false,
        change: {
          changeOnDay: '$changeOnDay',
          date: '$_id.date',
        },
        owner: '$_id.owner',
      },
    },
    {
      sort: { 'change.date': 1 },
    },
    {
      group: {
        objectId: { owner: '$owner' },
        changes: { $push: '$change' },
      },
    },
    {
      project: {
        objectId: false,
        owner: '$_id.owner',
        changes: '$changes',
      },
    },
  ]

  const query = new Moralis.Query(request.params.transfers)
  const dates = await query.aggregate(pipelineDates)

  const minDate = new Date(dates[0].minDate)
  const maxDate = new Date(dates[0].maxDate)

  const ONE_DAY = 1000 * 60 * 60 * 24
  const diffInDays = Math.round((maxDate - minDate) / ONE_DAY)

  const logger = Moralis.Cloud.getLogger()
  logger.info(
    'Dates range from ' +
      minDate.toISOString().split('T')[0] +
      ' through ' +
      maxDate.toISOString().split('T')[0] +
      ' diff in days ' +
      diffInDays,
  )

  const result = await query.aggregate(pipelineGroup)

  const expanded = result.map((e) => {
    const { owner, changes } = e
    const expandedChanges = new Array(diffInDays).fill(0)
    const cumulativeHoldings = new Array(diffInDays).fill(0)
    const holding = new Array(diffInDays).fill(0)
    let currentHoldings = 0

    for (const element of changes) {
      const date = new Date(element.date)
      const index = Math.round((date - minDate) / ONE_DAY)
      expandedChanges[index] = element.changeOnDay
    }

    for (let i = 0; i < expandedChanges.length; i++) {
      currentHoldings += expandedChanges[i]
      cumulativeHoldings[i] = currentHoldings
      if (currentHoldings < 0) {
        logger.info('WARNING ' + currentHoldings + ' ' + i + owner)
      }
      holding[i] = currentHoldings > 0 ? 1 : 0
    }

    return { ...e, expandedChanges, cumulativeHoldings, holding }
  })

  let holders = new Array(diffInDays).fill(0)
  let yachts = new Array(diffInDays).fill(0)

  logger.info('yachts before ' + yachts)

  for (let i = 0; i < expanded.length; i++) {
    yachts = expanded[i].cumulativeHoldings.map(
      (yacht, ix) => yacht + yachts[ix],
    )
    holders = expanded[i].holding.map((item, idx) => item + holders[idx])
  }

  logger.info('Holders are ' + holders)
  logger.info('Yachts are ' + yachts)

  // return { holders, yachts }
  return { holders, yachts }
})

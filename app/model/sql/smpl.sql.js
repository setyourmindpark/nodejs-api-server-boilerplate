const escape              = require('mysql').escape;

exports.select = (model) => {
  return `
    select *
    from sample
    where 1=1
    and col5 = ${escape(model.col5)}
    ${cond1(model)}`
}

exports.select2 = (model) => {
  return `
    select * from sample where id = ${escape(model.id)}`
}

exports.transaction = (model) => {
  return `
    insert into sample(
      id,col1,col2,col3,col4,col5
    ) values(
      ${escape(model.id)}
      ,${escape(model.col1)}
      ,${escape(model.col2)}
      ,${escape(model.col3)}
      ,${escape(model.col4)}
      ,${escape(model.col5)}
    )`
}

exports.select3 = (model) => {
  return `
    select * from sample_rel where sample_id = ${escape(model.sample_id)}`
}

exports.examplePagenation = (model) => {
  return `

    select *
    from sample
    where 1=1
    ${pagenation_cond(model)}

    `
}

exports.examplePagenationCnt = (model) => {
  return `
    select count(*) as cnt
    from sample
    where 1=1
    ${pagenation_cond(model)}
    `
}

function pagenation_cond(model){
  return `
    and col1 = ${escape(model.where)}
  `
}

function cond1(model){
  let phrase = '';
  if(model.col1){
    phrase += `and col1 = ${escape(model.col1)}`
  }
  return phrase;
}

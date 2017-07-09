function slug(text) {
  const alphabetWithAccents = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const alphabet = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const regex = new RegExp(alphabetWithAccents.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(regex, c =>
      alphabet.charAt(alphabetWithAccents.indexOf(c))
    )
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export default {
  slug,
}

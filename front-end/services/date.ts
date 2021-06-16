const getReleaseDate = (date: String) => {
    const dateMonth = date.substring(0, 6);
    const year = date.substring(date.length-4)
    if (dateMonth === '31 Dec') {
      return `${year}`
    } else if (dateMonth === "30 Sep") {
      return `Q3 ${year}`
    } else if (dateMonth === "30 Jun") {
      return `Q2 ${year}`
    } else if (dateMonth === "30 Mar") {
      return `Q1 ${year}`
    } else {
      return date
    }
  }

export default getReleaseDate;
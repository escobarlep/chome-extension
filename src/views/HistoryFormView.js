export default {
  id: 'app',
  window: '/src/public/history.html',
  _data: null,
  setTmaCalc: function(func) {
    this.tmaCalc = func
  },
  setData: function(data) {
    this._data = data
  },
  mountTBody: function() {
    const keys = Object.keys(this._data)
    let tBody = ''
    keys.forEach(key => {
      tBody += this._data[key].map(history => `
          <tr class="${history.partnerFraud ? 'red-text' : '' }">
            <td><span hidden>${history.createdAt}</span>${history.formatedDate}</td>
            <td>${history.customerOrder}</td>
            <td>${history.customerName}</td>
            <td>${history.partnerName}</td>
            <td>${history.partnerSite}</td>
            <td>${history.templateName}</td>
          </tr>
        `
      ).join('')
    })
    return tBody
  },
  mountCardSummary: function() {
    const totalByDate = Object.keys(this._data).reverse()

    return totalByDate.map(date => {
      const tma = this.tmaCalc(this._data, date)
      return ` 
      <div class="col s12 m3 L2">
        <div class="card-panel black">
          <p class="center white-text">
            ${date} : ${this._data[date].length} <br>
            TMA = ${tma} (Min/Tickets)
          </p>
        </div>
      </div>
    `
    }).join('')
  },
  
  template: function() {
    if (this._data) {
      const sumUp = this.mountCardSummary(this._data)
      const tBody = this.mountTBody(this._data)
      return `
        <div class="row">
          ${sumUp}
        </div>
        <table class="responsive-table striped highlight">
          <thead>
            <tr>
              <th>Data</th>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Nome do Parceiro</th>
              <th>Site</th>
              <th>Template Selecionada</th>
            </tr>
          </thead>
          <tbody>
            ${tBody}
          </tbody>
        </table>`
    }

    return '<div class="row"><p class="red-text"> Histórico não encontrado <i class="material-icons red-text">error</i></p></div>'
  }
}

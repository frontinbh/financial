import Link from 'next/link'

import Head from '../components/head'
import Nav from '../components/nav'
import StaffSplit from '../components/staff-split'
import 'whatwg-fetch'

export default class Dashboard extends React.Component {
  state = { message: '', staff: '', pricing: 0 }
  componentDidMount() {
    document.getElementById("file-input").onchange = () => {
      const files = document.getElementById('file-input').files
      const file = files[0]
      if(file == null){
        return alert('No file selected.')
      }
      this.getSignedRequest(file)
    }
  }

  handleChange = (e) => {
    const isNumber = /\d/.test(e.target.value);

    if (isNumber && e.target.name === 'pricing') {
      this.setState({ [e.target.name]: e.target.value })
    }
    if (!isNumber && e.target.name != 'pricing') {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  getSignedRequest = (file) => {
    this.setState({ message: 'Salvando Dados...' })
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/sign-s3?staff=${this.state.staff}&file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  uploadFile = (file, signedRequest, url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          fetch('/api/staff', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staff: this.state.staff, pricing: this.state.pricing, url })
          }).then(res => {
            return res.json()
          }).then(response => {
            if (response.status) {
              this.setState({ message: 'Dados salvos com sucesso' })
            } else {
              this.setState({ message: 'Ocorreu um erro, tente novamente' })
            }
            setTimeout(() => {
              this.setState({ staff: '', pricing: 0 })
            }, 2000)
          })
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  render() {
    return (
      <div>
        <Head title="Financial Staffs" />
        <Nav />
        <div className="container">
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-12" style={{ marginBottom: 40 }}>
              <StaffSplit />
            </div>
            
            <div className="col-12" style={{ marginBottom: 40 }}>
              <h2>Adicionar Despesas</h2>
              <label htmlFor="">
                Nome:
                <select className="form-control" value={this.state.staff} name="staff" onChange={this.handleChange}>
                  <option value="">Quem gastou?</option>
                  <option value="Bruno">Bruno</option>
                  <option value="Davidson">Davidson</option>
                  <option value="Giovanni">Giovanni</option>
                  <option value="Victor">Victor</option>
                </select>
              </label>
              <label htmlFor="" style={{ marginLeft: 20 }}>
                Valor gasto:
                <input className="form-control" type="number" name="pricing" value={this.state.pricing} onChange={this.handleChange} />
              </label>
              <div style={{ display: this.state.staff && this.state.pricing !== 0 ? 'block' : 'none' }}>
                <input type="file" id="file-input" />
                <img id="preview" src=""/>
                <h4>{this.state.message}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 
}

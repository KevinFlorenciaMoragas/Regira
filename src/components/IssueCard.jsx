
const State = ({ value }) => <p>{value}</p>
const Priority = ({ value }) => <p>{value}</p>
const Type = ({ value }) => <h2>{value}</h2>

const getColorByType = ({ type }) => {
  if (type === 'bug') {
    return 'bg-red-400'
  } else if (type === 'feature') {
    return 'bg-green-400'
  } else {
    return 'bg-blue-400'
  }
}

export default ({ data, reference, isDragging, eliminaItem }) => {

  return (
    <>
      {/* <div ref={reference} className={"border border-primary d-flex flex-column bg-info-subtle  p-2 m-3 " + getColorByType(data)}>
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
        <Priority value={data.priority} />
        <State value={data.user.name} />

      </div> */}
      <div ref={reference} class="">
        <div class="container">
          <div class="row hidden-md-up">
            <div class="col-md-8 offset-2">
              <div class="card">
                <div class="card-block">
                  <h4 class="card-title">{data.title}</h4>
                  <h6 class="card-subtitle text-muted">{data.desc}</h6>
                  <p class="card-text p-y-1">{data.priority}</p>
                  <p class="card-text">{data.user.name}</p>
                  <div className="text-center">
                  <button className="btn btn-danger p-2 bg-red-600 text-white" onClick={() => eliminaItem(data)}>Elimina</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )
}
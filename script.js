let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

function getElement(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
};

let addedParamCount = 0;

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `
        <div class="form-row my-2">
            <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
            <div class="col-md-4">
            <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter Key ${addedParamCount + 2}">
            </div>
            <div class="col-md-4">
            <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter Value ${addedParamCount + 2}">
            </div>
            <button style='padding:0px 14.5px;font-weight:bold;' class="btn btn-danger deleteparam">-</button>
        </div>
    `;
    let paramElement = getElement(string);
    params.appendChild(paramElement);
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    };

    addedParamCount++;
});

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseJsonText').innerHTML = "Please wait Fetching Response..."
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('responseJsonText').value;
    };
    console.log('url is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);
    if (requestType == 'GET') {
        fetch(url, { method: 'GET' })
            .then(response => response.text())
            .then((text) => { document.getElementById('responseJsonText').innerHTML = text; Prism.highlightAll() });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.text())
            .then((text) => { document.getElementById('responseJsonText').innerHTML = text; Prism.highlightAll() });
    }
});
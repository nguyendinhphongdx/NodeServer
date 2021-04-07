const axios = require("axios");
class SaltHelper {
	constructor() {
		this.headers = "";
        this.token = "";
        this.expire ="";
		this.init();
	}

	 init() {
        const data = {
			username: "saltapi",
			password: "saltapi",
			eauth: "pam",
		  };
        this.ready =  axios.post("https://saltgui.bkav.com/api/login", data)
        .then(data => {
            console.log("data"+ data.return[0]);
            
            // if(typeof data === "object" && typeof data.return === "object" && typeof data.return[0].token === "string") {
			// 	this.token = data.return[0].token;
			// 	this.expire = data.return[0].expire;
			// } else {
			// 	throw "Got no token";
			// }
        })
        .catch((e) => {
            console.error(e)
        })
        console.log("this ready" + this.ready);
	}

	async fun(tgt="*", fun="test.ping", arg=false, kwarg=false, client="local", pillar=false, timeout=false) {
		if(this.expire <= new Date() / 1000) {
			this.init();
			await this.ready;
		}
		let form = { tgt, fun, client }
		if(arg) form.arg = arg;
		if(kwarg) form.kwarg = kwarg;
		if(pillar) form.pillar = pillar;
		if(timeout) form.timeout = timeout;
        const res = await axios.post('https://saltgui.bkav.com/api/',form,{
            headers: {"X-Auth-Token": this.token},
            contentType: 'application/json'})
        return res.data.return[0];
	}

}

module.exports =  SaltHelper;
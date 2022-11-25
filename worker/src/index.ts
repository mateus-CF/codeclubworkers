/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		if (request.method == "POST"){
			const headersObject = Object.fromEntries(request.headers);
			const data = {
				hello: 'Hey! You did a POST request!',
				method: request.method,
				your_city: request.cf.city,
				request_headers: headersObject,
				//bot_score: request.cf.
			};
		
			const json = JSON.stringify(data, null, 2);
		
			return 	new Response(json, {
						headers: {
							'content-type': 'application/json;charset=UTF-8',
							'x-workers-hello': 'Hello from Cloudflare Workers',
						},
					});

		}
		else if(request.method == "GET"){
			function getRandomInt(max) {
				return Math.floor(Math.random() * max);
			};
			const gen_reply ={
				replies :  {
					0 : "Yes",
					1 : "No",
					2 : "Not likely",
					3 : "Most likely"
				},
				limit : 4,
				get_text : function(){
					return "Magic 8 ball says: " + this.replies[getRandomInt(this.limit)]
				}

			};

			return new Response(gen_reply.get_text());
		}
	},
};

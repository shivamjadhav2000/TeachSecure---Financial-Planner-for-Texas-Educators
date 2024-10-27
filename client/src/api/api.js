const BaseUrl=process.env.REACT_APP_API_URL
export async function heartbeatapi(token){
    const response = await fetch(BaseUrl+'heartbeat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:'Bearer '+ token
        },
      });
      return response.json()
}

export async function login(data){
    const response = await fetch(BaseUrl+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
});
    return  response.json()

} 
export async function signup(data){
    const response = await fetch(BaseUrl+'/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
});
    return  response.json()

} 
export async function profileUpdate(data,token){
  console.log("data==",data)
    const response = await fetch(BaseUrl+'/api/common/users/profile-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:'Bearer '+ token
        },
        body: JSON.stringify(data),
});
    return  response.json()

}
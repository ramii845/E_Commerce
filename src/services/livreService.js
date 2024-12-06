import axios from "../Api/axios"; 
const LIVRE_API="articles" 
export const fetcharticles=async()=> { 
return await axios.get(LIVRE_API); 
} 
export const fetcharticleById=async(livreID)=> { 
return await axios.get(LIVRE_API + '/' + livreID); 
} 
export const deletearticle=async(livreID) =>{ 
return await axios.delete(LIVRE_API + '/' + livreID); 
} 
export const addarticle=async(article)=> { 
return await axios.post(LIVRE_API, article); 
} 
export const editarticle=(article) =>{ 
return axios.put(LIVRE_API + '/' + article.id, article); 
} 
export const fetcharticlesPagination=async(page,limit)=> { 
return await axios.get(LIVRE_API + 
`/art/pagination?page=${page}&pageSize=${limit}`) 
}
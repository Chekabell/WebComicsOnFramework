import {$authHost, $host} from "@/api/index.js";

export const getProjects = async () =>{
  const projects = await $host.get('api/comics/')
  return projects.data
}

export const getOneProject = async (id) => {
  const project = await $host.get('api/comics/'+ id + '/')
  return project.data
}

export const getTags = async () => {
  const tags = await $host.get('api/tags/')
  return tags.data
}

export const getComicsTypes = async () => {
  const comicsTypes = await $host.get('api/comicstypes/')
  return comicsTypes.data
}

export const addProject = async (title, description, url, type, image) =>{
  const form = new FormData()
  form.append('title', title)
  form.append('description', description)
  form.append('url', url)
  form.append('type', type)
  form.append('image', image)
  const response = await $authHost.post('api/comics/', form,
      {
    headers: {
      'Content-Type': 'multipart/form-data'
    }})
  console.log(response.data)
  return response.data
}

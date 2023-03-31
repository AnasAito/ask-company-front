import { useState,useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'

// import Queries from '../../api/static'
import { View } from './view'




 
const  getItems =  (homepage_url) => {
  return fetch(`https://asklandingpage-1-g1623631.deta.app/process/?homepage_url=${homepage_url}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  })
    .then(data => data.json())
}
const  getItem =  (homepage_url,nodeId) => {
  return fetch(`https://asklandingpage-1-g1623631.deta.app/render/?homepage_url=${homepage_url}&node_id=${nodeId}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  })
    .then(data => data.json())
}
export function ArticlesLayout() {
  const [skillId, setSkillId] = useState(null)
  const [nodeId,setNodeId] = useState(null)
  const [nodeContent,setNodeContent] = useState([])
  const [items,setItems] = useState([])

  useEffect(() => {
    if (skillId){  let mounted = true;
 
      getItems(skillId)
        .then(items => {
          if(mounted) {
            setItems(items.payload.slice(0, 30))
            console.log(items)
          }
        })
      return () => mounted = false;}
  
  }, [skillId])
  useEffect(() => {
    if (nodeId){  let mounted = true;
 
      getItem(skillId,nodeId)
        .then(items => {
          if(mounted) {
            setNodeContent(items.payload)
            console.log(items)
          }
        })
      return () => mounted = false;}
  
  }, [nodeId])
  console.log('nodeContent',nodeContent)
  return (
    <>
      <View
      
      items={items}
       nodeContent={nodeContent?nodeContent:[]}
        loading_node={false}
        setSkillId={setSkillId}
        setNodeId={setNodeId}
        nodeId = {nodeId}
        skillId={skillId}
        articleCount={items.length}
        SkillName={'SkillName'}
      />
      {/* <div>test</div> */}
    </>
  )
}

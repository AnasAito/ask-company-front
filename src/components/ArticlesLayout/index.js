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
export function ArticlesLayout() {
  const [skillId, setSkillId] = useState(null)
  const [items,setItems] = useState([])
  useEffect(() => {
    if (skillId){  let mounted = true;
 
      getItems(skillId)
        .then(items => {
          if(mounted) {
            setItems(items)
            console.log(items)
          }
        })
      return () => mounted = false;}
  
  }, [skillId])
  return (
    <>
      <View
        cards_to_render={[]}
        staticTrends={[]}
        loading_node={false}
        setSkillId={setSkillId}
        skillId={skillId}
        articleCount={0}
        SkillName={'SkillName'}
      />
      {/* <div>test</div> */}
    </>
  )
}

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'

// import Queries from '../../api/static'
import { View } from './view'

const getItems = (homepage_url) => {
  return fetch(
    `https://asklandingpage-1-g1623631.deta.app/v2/process/?homepage_url=${homepage_url}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((data) => data.json())
}
const getItem = (homepage_url, nodeId) => {
  return fetch(
    `https://asklandingpage-1-g1623631.deta.app/v2/render/?homepage_url=${homepage_url}&node_id=${nodeId}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((data) => data.json())
}
const is_spetial = (label) => {
  label = label.toLowerCase()
  return (
    label.includes('product') ||
    label.includes('solution') ||
    label.includes('feature') ||
    label.includes('platform') ||
    label.includes('team') ||
    label.includes('service') ||
    label.includes('why') ||
    label.includes('user')
  )
}
const filtred_labels = [
  'services',
  'machines',
  'innovations',
  // 'scrubbers',
  'services',

  'parts',
]
const format_items = (items) => {
  console.log(items)
  let grids = items.grids
  let link_lists = items.link_lists
  let paragraphs = items.orphan_paragraphs
  let items_formated = []
  for (let item of grids) {
    let item_id = item[0]
    let item_meta = item[1]
    if (
      (item_meta['label'].split(' ').length <= 10) &
      (item_meta['label'] != 'Kumo and PyG Users')
    ) {
      items_formated.push({
        id: item_id,
        label: item_meta['label'],
        type: 'grid',
        is_spetial: is_spetial(item_meta['label']),
      })
    }
  }
  for (let item of link_lists) {
    let item_id = item[0]
    let item_meta = item[1]
    if (
      (item_meta['label'].split(' ').length <= 10) &
      filtred_labels.includes(item_meta['label'].toLowerCase())
    ) {
      items_formated.push({
        id: item_id,
        label: item_meta['label'],
        type: 'link_list',
        is_spetial: is_spetial(item_meta['label']),
      })
    }
  }
  for (let item of paragraphs) {
    let item_id = item[0]
    let item_meta = item[1]
    if (item_meta['label'].split(' ').length <= 10) {
      items_formated.push({
        id: item_id,
        label: item_meta['label'],
        type: 'paragraph',
        is_spetial: is_spetial(item_meta['label']),
      })
    }
  }
  return items_formated
}
export function ArticlesLayout() {
  const [skillId, setSkillId] = useState(null)
  const [nodeId, setNodeId] = useState(null)
  const [nodeContent, setNodeContent] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (skillId) {
      let mounted = true

      getItems(skillId).then((items) => {
        if (mounted) {
          setItems(format_items(items.payload))
          console.log(format_items(items.payload))
        }
      })
      return () => (mounted = false)
    }
  }, [skillId])
  useEffect(() => {
    if (nodeId) {
      let mounted = true
      // console.log('laoding ')
      setLoading(true)
      getItem(skillId, nodeId).then((items) => {
        if (mounted) {
          console.log('item uniaue', items.payload)
          setNodeContent(items.payload)
          // console.log(items)
          // setLoading(false)
        }
      })

      return () => (mounted = false)
    }
  }, [nodeId])
  console.log('nodeContent', nodeContent)
  return (
    <>
      <View
        items={items}
        nodeContent={nodeContent ? nodeContent : []}
        loading_node={false}
        setSkillId={setSkillId}
        setNodeId={setNodeId}
        nodeId={nodeId}
        skillId={skillId}
        articleCount={items.length}
        SkillName={'SkillName'}
        loading={loading}
      />
      {/* <div>test</div> */}
    </>
  )
}

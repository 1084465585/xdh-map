import * as Layers from '../../utils/layers'

describe('test utils/layers', () => {
  
  it('setLayersConfig', () => {
    
    const layers = {
      Baidu: {
        title: '百度1'
      }
    }
    Layers.setLayersConfig(layers)
    const newLayer = Layers.getLayersConfig('Baidu')
    expect(layers.Baidu.title).toMatch(newLayer.title)
    
  })
  
})

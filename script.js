window.onload = () => {
    render();
  };
  
  const models = [
    // {
    //   url: './assets/loopingFlower-pla.glb',
    //   scale: '0.5 0.5 0.5',
    //   rotation: '0 225 0'
    // },
    {
      url: './assets/butterfly and petals falling.glb',
      scale: '0.5 0.5 0.5',
      rotation: '0 225 0'
    },
    {
      url: './assets/butterflyFBX-none.glb',
      scale: '0.2 0.2 0.2',
      rotation: '0 225 0'
    },
    // {
    //   url: './assets/dragonite/scene.gltf',
    //   scale: '0.08 0.08 0.08',
    //   rotation: '0 225 0'
    // },
  ];
  
  let modelIndex = 0;
  const setModel = (model, entity) => {
    if (model.scale) {
      entity.setAttribute('scale', model.scale);
    }
  
    if (model.rotation) {
      entity.setAttribute('rotation', model.rotation);
    }
  
    if (model.position) {
      entity.setAttribute('position', model.position);
    }
  
    entity.setAttribute('gltf-model', model.url);
  };
  
  // should place the model in an offset within the range of the device position
  // allow zoom in zoom out?
  // set the height of the thing to be above the floor/phone level 
  // allow front and back camera 
  function render() {
    const scene = document.querySelector('a-scene');
    const offset = 0;// only for testing 
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude+offset;
      const longitude = position.coords.longitude+offset;
  
      const model = document.createElement('a-entity');
      model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
  
      setModel(models[modelIndex], model);
  
      model.setAttribute('animation-mixer', '');
  
      document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        const entity = document.querySelector('[gps-entity-place]');
        modelIndex++;
        const newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
      });
  
      scene.appendChild(model);
    });
  }
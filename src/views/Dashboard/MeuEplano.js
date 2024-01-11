// MyDash.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Importe Resizable e outros necessários
import { Responsive as ResponsiveGridLayout, WidthProvider } from 'react-grid-layout';
import { Resizable } from 'react-resizable';
import { RiMoreFill } from 'react-icons/ri';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Layout from '../../components/Layout/layout';
import './MyDash.scss';
import DynamicComponentLoader from '../DynamicComponentLoader';

import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc, updateDoc } from 'firebase/firestore';

const MyDash = () => {
  const [widgetIds, setWidgetIds] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState([]);
  const [openWidgets, setOpenWidgets] = useState([]);
  const [nextColumnIndex, setNextColumnIndex] = useState(0);
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [showWidgetList, setShowWidgetList] = useState(false);
  const [openedWidgetsData, setOpenedWidgetsData] = useState([]);
  const [dashControllerData, setDashControllerData] = useState([]);
  const [widgetData, setWidgetData] = useState({});
  const { dashboardId } = useParams();
  const [selectedCard, setSelectedCard] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [widgets, setWidgets] = useState([]); // Exemplo de inicialização do estado


  useEffect(() => {
    const fetchDashControllerData = async () => {
      const db = getFirestore();
      const dashControllerCollection = collection(db, 'dashcontroller');

      try {
        const querySnapshot = await getDocs(dashControllerCollection);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDashControllerData(data);
      } catch (error) {
        console.error('Error fetching dash controller data:', error);
      }
    };

    const fetchWidgetData = async () => {
      const db = getFirestore();
      const widgetsBaseCollection = collection(db, 'widgetsBase');

      try {
        const querySnapshot = await getDocs(widgetsBaseCollection);
        const data = querySnapshot.docs.reduce((acc, doc) => {
          const widgetId = doc.data().widgetId;
          acc[widgetId] = doc.data();
          return acc;
        }, {});
        setWidgetData(data);
      } catch (error) {
        console.error('Error fetching widget data:', error);
      }
    };

    fetchDashControllerData();
    fetchWidgetData();
  }, []);

  useEffect(() => {
    const fetchWidgets = async () => {
      const db = getFirestore();
      const widgetsCollection = collection(db, 'widgetsBase');

      try {
        const querySnapshot = await getDocs(widgetsCollection);

        const widgetIds = querySnapshot.docs.map(doc => doc.data().componentId);
        setWidgetIds(widgetIds);

        const widgetsData = querySnapshot.docs.map(doc => doc.data());
        setAvailableWidgets(widgetsData);

        if (widgetIds.length > 0) {
          setSelectedWidgetId(widgetIds[0]);
        }

        const salesCollection = collection(db, 'sales');
        const salesQuerySnapshot = await getDocs(salesCollection);

        const validAmounts = salesQuerySnapshot.docs
          .map(doc => doc.data().amount)
          .filter(amount => typeof amount === 'number' && !isNaN(amount));

        const total = validAmounts.reduce((acc, amount) => acc + amount, 0);
        setTotalAmount(total);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching widgets:', error);
      }
    };

    fetchWidgets();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

// Dentro da função `addWidget`:
const addWidget = async (widget) => {
  const widgetType = widget.componentId;
  const widgetId = widget.widgetId;
  
  // Verifique se o widget já está aberto
  if (!openWidgets.includes(widgetId)) {
    const row = Math.floor(openWidgets.length / 4);
    const col = nextColumnIndex % 4;

    const newLayoutItem = {
      i: widgetId,
      x: nextColumnIndex * 4, // Ajuste as coordenadas x
      y: 0, // Mantenha as coordenadas y como 0
      w: 4,
      h: 8,
    };

    try {
      const db = getFirestore();
      const dashWidgetControllerCollection = collection(db, 'dashcontroller');

      // Adicione o novo widget aberto ao Firestore
      const docRef = await addDoc(dashWidgetControllerCollection, {
        widgetId: widgetId,
        dashboardId: dashboardId,
        status: 1, // Adicione o campo status com o valor 1
      });

      console.log('Widget adicionado com sucesso:', docRef.id);
      console.log('Widgets abertos:', openWidgets);

      setLayout([...layout, newLayoutItem]);
      setOpenWidgets([...openWidgets, widgetId]);
      setOpenedWidgetsData([...openedWidgetsData, { id: docRef.id, widgetId, layout: newLayoutItem }]);
      setNextColumnIndex(nextColumnIndex + 1);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao adicionar widget ao dashwidgetcontroller:', error);
    }
  }
};
  
useEffect(() => {
  const fetchWidgets = async () => {
    const db = getFirestore();
    const dashControllerCollection = collection(db, 'dashcontroller');

    try {
      // Consulta os documentos da coleção 'dashcontroller' filtrando pelo dashboardId
      const querySnapshot = await getDocs(
        query(dashControllerCollection, where('dashboardId', '==', dashboardId))
      );

      const dashControllerData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDashControllerData(dashControllerData);

      // Crie um novo layout apenas com widgets provenientes da coleção 'dashcontroller'
      const dashControllerLayout = dashControllerData.map(item => ({
        i: item.widgetId,
        x: 0,
        y: 0,
        w: 4,
        h: 8,
      }));

      // Atualize o estado `layout` apenas com o novo layout
      setLayout(dashControllerLayout);

    } catch (error) {
      console.error('Error fetching dash controller data:', error);
    }
  };

  fetchWidgets();
}, [dashboardId]); // Adicione dashboardId como dependência para que o efeito seja acionado quando ele mudar

const handleShare = (widgetId) => {
  // Implemente a lógica para compartilhar o widget com base no widgetId
  console.log(`Compartilhando widget ${widgetId}`);
  // Feche o popover após a ação
  setSelectedCard(null);
};

const handleDelete = async (widgetId) => {
  try {
    const db = getFirestore();
    const dashControllerCollection = collection(db, 'dashcontroller');

    // Consulta os documentos na coleção dashController com as condições especificadas
    const querySnapshot = await getDocs(
      query(dashControllerCollection, 
        where('widgetId', '==', widgetId),
        where('dashboardId', '==', dashboardId)
      )
    );

    // Itera sobre os documentos encontrados
    querySnapshot.forEach(async (doc) => {
      try {
        // Atualiza o campo 'status' para 0 (indicando que o widget está desativado)
        await updateDoc(doc.ref, { status: 0 });
        console.log(`Widget ${widgetId} removido com sucesso`);

        // Atualiza o estado no frontend para remover o widget excluído
        setWidgets((prevWidgets) => prevWidgets.filter(widget => widget.widgetId !== widgetId));
        console.log(`Widget ${widgetId} removido do frontend`);
      } catch (updateError) {
        console.error('Erro ao atualizar o status do widget:', updateError);
      }
    });

    // Verifica se pelo menos um documento foi encontrado
    if (querySnapshot.size === 0) {
      console.log(`Widget ${widgetId} não encontrado na coleção dashController`);
    }
  } catch (error) {
    console.error('Erro ao remover widget:', error);
  }

  // Feche o popover após a ação
  setSelectedCard(null);
};



  const onResize = (layout, oldItem, newItem) => {
    setLayout(
      layout.map(item =>
        item.i === oldItem.i
          ? { ...newItem, w: Math.round(newItem.w), h: Math.round(newItem.h) }
          : item
      )
    );
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const WidgetOptions = () => (
    <div>
      <h3>Selecione um Indicador</h3>
      <input
        type="text"
        placeholder="Buscar widget..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {availableWidgets
          .filter((widget) =>
            widget.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((widget) => (
            <li key={widget.type} onClick={() => addWidget(widget)}>
              <div className="widget-item">
                <div className="widget-logo">
                  <img src={`${widget.logo}`} alt={widget.label} />
                </div>
                <div className="widget-sistema">
                  <div>{widget.label}</div>
                </div>
                <div className="widget-info">
                  <div>{widget.description}</div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          
        <div className='hd-dashboard'>
              <div className='botao_add_widget'>
                <div className='primary-button primary-color' onClick={toggleModal}>
                  + Adicionar Data Card
                </div>
                {showModal && (
                  <>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal'>
                      {WidgetOptions()}
                    </div>
                  </>
                )}
                {showPopover && (
                  <div>
                    <p>Escolha um widget:</p>
                    <input
                      type="text"
                      placeholder="Buscar widget..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul>
                      {availableWidgets
                        .filter((widget) => widget.label.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((widget) => (
                          <li key={widget.type} onClick={() => addWidget(widget)}>
                            {widget.label}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {showWidgetList && (
                  <div>
                    <p>Escolha um widget:</p>
                    <ul>
                      {availableWidgets.map((widget) => (
                        <li key={widget.type} onClick={() => addWidget(widget)}>
                          {widget.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>


          
{/* 
          {selectedWidgetId ? (
            <>
              <DynamicComponentLoader componentId={selectedWidgetId} totalAmount={totalAmount} />
            </>
          ) : (
            <div>No widgets available.</div>
          )} */}

<div className="dashboard-widgets">
  {layout.map(item => {
    // Encontre o objeto correspondente ao widgetId no estado dashControllerData
    const widgetController = dashControllerData.find(controller => controller.widgetId === item.i);
    if (widgetController && widgetController.status === 1) {
      console.log('Widget Controller:', widgetController);
      return (
        <div key={item.i} className="item-grid">

          {console.log('Widget no layout:', item)}
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: [item] }}
            breakpoints={{ lg: 1200 }}
            cols={{ lg: 12 }}
            rowHeight={30}
            width={1200}
            isResizable={{ x: true, y: true, w: true, h: true }}
          >
            {/* Map over layout array and render Resizable for each item */}
            {layout.map(layoutItem => {
  if (layoutItem.i === item.i) {
    console.log('Resultado da DynamicComponentLoader:', <DynamicComponentLoader componentId={layoutItem.i} totalAmount={totalAmount} />);
    return (
      <div key={layoutItem.i}>
               <div
          className="card-menu"
          onMouseDown={(e) => {
            e.preventDefault();
            setSelectedCard(layoutItem.i);
          }}
        >
          <RiMoreFill />
        </div>
        {selectedCard === layoutItem.i && (
          <div>
            <div
            className="popover"
          >
            <ul>
              <li onClick={() => handleShare(layoutItem.i)}>
                Compartilhar Card
              </li>
              <li onClick={() => handleDelete(layoutItem.i)}>
                Remover Card
              </li>
              <li onClick={() => handleDelete(layoutItem.i)}>
                Fechar
              </li>
            </ul>
          </div>
          <div className='overlay'></div>
          </div>
        )}
        <Resizable
          width={layoutItem.w * 30}
          height={layoutItem.h * 30}
          onResize={(e, data) => {
            const resizedItem = {
              ...layoutItem,
              w: Math.round(data.size.width / 30),
              h: Math.round(data.size.height / 30),
            };
            onResize(layout, layoutItem, resizedItem);
          }}
          handle={<div className="custom-handle" />}
        >
          <div className='item-grid'>
            {/* Use the same logic to dynamically load the component from the database */}
            <DynamicComponentLoader widgetId={layoutItem.i} totalAmount={totalAmount} />
          </div>
        </Resizable>
      </div>
    );
  } else {
    return null;
  }
})}

          </ResponsiveGridLayout>
        </div>
      );
}
    // If the widget is not active (status !== 1), return null to avoid rendering it
    return null;
  })}
</div>



        </div>
      </div>
    </Layout>
  );
};

export default MyDash;
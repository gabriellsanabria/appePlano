// Dashs.js

import React, { useState, useEffect } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { Resizable } from 'react-resizable';
import { GrClose } from "react-icons/gr";
import { TfiMoreAlt } from "react-icons/tfi";

import Layout from '../../components/Layout/layout';
import GmvCompany from '../../widgets/Company/GmvCompany';
import GmvIfood from '../../widgets/Ifood/GmvIfood';
import RappiWidget from '../../widgets/Rappi/Widget1';
import AcconWidget from '../../widgets/Accon/Widget1';
import SaiposWidget from '../../widgets/Saipos/Widget1';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './MyDash.scss';
import { useParams } from 'react-router-dom'; // Importe o hook useParams

const MyDash = () => {
  const [layout, setLayout] = useState([]);
  const [openWidgets, setOpenWidgets] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [showWidgetList, setShowWidgetList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nextColumnIndex, setNextColumnIndex] = useState(0);

  const availableWidgets = [
    { type: 'GmvIfood', label: 'iFood', description: 'Total Vendas', logo: 'https://i.pinimg.com/736x/e6/54/8f/e6548f20067f0fa001e8439668849dab.jpg' },
    { type: 'GmvCompany', label: 'Saipos', description: 'Total de Vendas Rede', logo: 'https://www.tecnosinos.com.br/wp-content/uploads/2019/03/Saipos-logo-vazado.png' },
    { type: 'RappiWidget', label: 'Rappi', description: 'Vendas no Mês', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Rappi_backgr_logo.png/800px-Rappi_backgr_logo.png' },
    { type: 'AcconWidget', label: 'Accon', description: 'Desempenho Anual', logo: 'https://media.licdn.com/dms/image/C4E0BAQEZmhdDTGta-A/company-logo_200_200/0/1630586931534/accon_tecnologia_logo?e=2147483647&v=beta&t=cbBKeNVVKWcOfxOW6gp-pDDlaHdUgfJer-lAH6KHM8U' },
  ];

  const maxWidgetsPerRow = 4;
  const widgetWidth = 4;
  const widgetHeight = 8;

  const widgetComponents = {
    GmvIfood: GmvIfood,
    GmvCompany: GmvCompany,
    AcconWidget: AcconWidget,
    SaiposWidget: SaiposWidget,
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

  const { urlBase, dashboardId, urlDash } = useParams(); // Obtenha os parâmetros da URL usando useParams

  const addWidget = (widget) => {
    const widgetType = widget.type;
    if (openWidgets.length < 10 && !openWidgets.includes(widgetType)) {
      const row = Math.floor(openWidgets.length / maxWidgetsPerRow);
      const col = nextColumnIndex % maxWidgetsPerRow;

      const newLayoutItem = {
        i: widgetType + layout.length,
        x: col * widgetWidth,
        y: row * widgetHeight,
        w: widgetWidth,
        h: widgetHeight,
      };

      setLayout([...layout, newLayoutItem]);
      setOpenWidgets([...openWidgets, widgetType]);
      setNextColumnIndex(nextColumnIndex + 1);
      setShowPopover(false);
      setShowModal(false);
    }
  };

  const closeWidget = (widgetType) => {
    setLayout(layout.filter((item) => !item.i.includes(widgetType)));
    setOpenWidgets(openWidgets.filter((type) => type !== widgetType));
    setNextColumnIndex(nextColumnIndex - 1);
  };

  const onResize = (layout, oldItem, newItem) => {
    setLayout(
      layout.map((item) =>
        item.i === oldItem.i ? { ...newItem, w: Math.round(newItem.w), h: Math.round(newItem.h) } : item
      )
    );
  };

  const toggleWidgetList = () => {
    setShowWidgetList(!showWidgetList);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div>
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
          </div>

          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200 }}
            cols={{ lg: 12 }}
            rowHeight={30}
            width={1200}
            onResize={onResize}
            isResizable={{ x: true, y: true, w: true, h: true }}
          >
            {layout.map((item) => (
              <div key={item.i}>
                <Resizable
                  width={item.w * 30}
                  height={item.h * 30}
                  onResize={(e, data) => {
                    onResize(layout, item, {
                      ...item,
                      w: Math.round(data.size.width / 30),
                      h: Math.round(data.size.height / 30),
                    });
                  }}
                  handle={<div className="custom-handle" />}
                >
                  <div>
                    {widgetComponents[item.i.split(/[0-9]/)[0]] && (
                      <div>
                        <div
                          className="more-button"
                          onClick={() => closeWidget(item.i)}
                        >
                          <TfiMoreAlt />
                        </div>
                        {React.createElement(widgetComponents[item.i.split(/[0-9]/)[0]], {
                          width: item.w * 100,
                          height: item.h * 30,
                          onResize: onResize,
                        })}
                      </div>
                    )}
                  </div>
                </Resizable>
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </Layout>
  );
};

export default MyDash;

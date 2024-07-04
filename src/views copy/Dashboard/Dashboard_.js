// Dashboard.js
import React, { useState } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { Resizable } from 'react-resizable';
import Layout from '../../components/Layout/layout';
import IfoodWidget from '../../widgets/Ifood/Widget1';
import RappiWidget from '../../widgets/Rappi/Widget1';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard = () => {
  const [layout, setLayout] = useState([]);
  const [openWidgets, setOpenWidgets] = useState([]);

  const availableWidgets = [
    { type: 'IfoodWidget', label: 'iFood Vendas no Ano' },
    { type: 'IfoodWidget', label: 'iFood Pedidos Cancelados' },
    { type: 'IfoodWidget', label: 'iFood Notas' },
    { type: 'RappiWidget', label: 'Rappi Vendas no Ano' },
    { type: 'RappiWidget', label: 'Rappi Pedidos Cancelados' },
    { type: 'RappiWidget', label: 'Rappi Notas' },
  ];

  const maxWidgetsPerRow = 5; // Máximo de widgets por linha
  const widgetWidth = 4;
  const widgetHeight = 5;

  const addWidget = (widgetType) => {
    if (openWidgets.length < 10 && !openWidgets.includes(widgetType)) {
      const row = Math.floor(openWidgets.length / maxWidgetsPerRow);
      const col = openWidgets.length % maxWidgetsPerRow;

      const newLayoutItem = {
        i: widgetType + layout.length,
        x: col * widgetWidth,
        y: row * widgetHeight,
        w: widgetWidth,
        h: widgetHeight,
      };

      setLayout([...layout, newLayoutItem]);
      setOpenWidgets([...openWidgets, widgetType]);
    }
  };

  const closeWidget = (widgetType) => {
    setLayout(layout.filter((item) => !item.i.includes(widgetType)));
    setOpenWidgets(openWidgets.filter((type) => type !== widgetType));
  };

  const onResize = (layout, oldItem, newItem) => {
    setLayout(
      layout.map((item) =>
        item.i === oldItem.i ? { ...newItem, w: Math.round(newItem.w), h: Math.round(newItem.h) } : item
      )
    );
  };

  return (
    
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
        <div>
      {availableWidgets.map((widget) => (
        <div key={widget.type}>
          <button onClick={() => addWidget(widget.type)}>Adicionar {widget.label}</button>
        </div>
      ))}

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
            >
              <div>
                {item.i.includes('ifoodWidget') && (
                  <div>
                    <button
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 1,
                      }}
                      onClick={() => closeWidget(item.i)}
                    >
                      X
                    </button>
                    <ifoodWidget width={item.w * 100} height={item.h * 30} onResize={onResize} />
                  </div>
                )}
                {item.i.includes('ifoodWidget') && (
                  <div>
                    <button
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 1,
                      }}
                      onClick={() => closeWidget(item.i)}
                    >
                      X
                    </button>
                    <ifoodWidget width={item.w * 100} height={item.h * 30} onResize={onResize} />
                  </div>
                )}
                {item.i.includes('RappiWidget') && (
                  <div>
                    <button
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 1,
                      }}
                      onClick={() => closeWidget(item.i)}
                    >
                      X
                    </button>
                    <RappiWidget width={item.w * 100} height={item.h * 30} onResize={onResize} />
                  </div>
                )}
                {item.i.includes('RappiWidget') && (
                  <div>
                    <button
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 1,
                      }}
                      onClick={() => closeWidget(item.i)}
                    >
                      X
                    </button>
                    <RappiWidget width={item.w * 100} height={item.h * 30} onResize={onResize} />
                  </div>
                )}
                {/* Adicione mais widgets conforme necessário */}
              </div>
            </Resizable>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
        </div>
      </div>
    </Layout>
    
  );
};

export default Dashboard;

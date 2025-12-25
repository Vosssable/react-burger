import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  wsConnectionStart,
  wsConnectionClosed,
} from '../store/actions/wsActions';
import { WS_BASE_URL } from '../helpers/utils/constants';
import OrderCard from '../components/orders/OrderCard/OrderCard';
import styles from './feedPage.module.css';

function FeedPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.wsFeed.orders);
  const total = useAppSelector((state) => state.wsFeed.total);
  const totalToday = useAppSelector((state) => state.wsFeed.totalToday);
  const ingredients = useAppSelector(
    (state) => state.ingredients.items.ingredients
  );

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_BASE_URL}/orders/all`, 'feed'));

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const doneOrders = orders
    .filter((order) => order.status === 'done')
    .slice(0, 20);
  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .slice(0, 20);

  const doneColumns: number[][] = [];
  for (let i = 0; i < doneOrders.length; i += 10) {
    doneColumns.push(doneOrders.slice(i, i + 10).map((order) => order.number));
  }

  const pendingColumns: number[][] = [];
  for (let i = 0; i < pendingOrders.length; i += 10) {
    pendingColumns.push(
      pendingOrders.slice(i, i + 10).map((order) => order.number)
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.orders_list}>
        <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              ingredients={ingredients}
              basePath="/feed"
            />
          ))}
        </div>
        <div className={styles.stats}>
          <div className={styles.stats_row}>
            <div className={styles.stats_column}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div className={styles.numbers_container}>
                {doneColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className={styles.numbers_column}>
                    {column.map((number, index) => (
                      <span
                        key={index}
                        className={`text text_type_digits-default ${styles.number_done}`}
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.stats_column}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div className={styles.numbers_container}>
                {pendingColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className={styles.numbers_column}>
                    {column.map((number, index) => (
                      <span
                        key={index}
                        className="text text_type_digits-default"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.stats_total}>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <span className="text text_type_digits-large">{total}</span>
          </div>
          <div className={styles.stats_total}>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <span className="text text_type_digits-large">{totalToday}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FeedPage;

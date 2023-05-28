import { useUnit } from 'effector-react/compat';
import {
  $modalContent,
  $modalIsOpened,
  $rating,
  modalClosed,
  modalConfirmed,
  ratingChosen,
} from '@/shared/ui/modal/model.ts';
import { Badge, Rating, Table } from '@mantine/core';
import { Icon } from '@iconify/react';

export const Modal = () => {
  const isOpened = useUnit($modalIsOpened);
  const modalContent = useUnit($modalContent);
  const rating = useUnit($rating);
  const rows = modalContent?.ingredients.map(element => (
    <tr key={element.ingredient}>
      <td>{element.ingredient}</td>
      <td>{element.proportion}</td>
    </tr>
  ));
  if (isOpened) {
    return (
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          onClick={() => {
            modalClosed();
          }}
          className="fixed inset-0 z-10 overflow-y-auto "
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              onClick={event => {
                event.stopPropagation();
              }}
              className="relative w-3/6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <img
                    className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                    src={modalContent?.img}
                    alt="dish"
                  />
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex justify-between">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        {modalContent?.title}
                      </h3>
                      <div className="flex items-center">
                        <Icon
                          width="20"
                          height="20"
                          icon="ic:round-star"
                          color="#228be6"
                          className="mr-1"
                        />
                        {modalContent?.rating}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-md text-gray-500">
                        {modalContent?.recipe}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div>
                        {modalContent?.groups.map(group => {
                          return <Badge key={group}>{group}</Badge>;
                        })}
                      </div>
                      <div className="ml-2">
                        {modalContent?.products.map(products => {
                          return (
                            <Badge color="green" key={products}>
                              {products}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <Table className="mt-2">
                      <tbody>{rows}</tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 px-4 py-3">
                <Rating defaultValue={rating} onChange={ratingChosen} />
                <div>
                  <button
                    onClick={() => modalClosed()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Вiдмiна
                  </button>
                  <button
                    onClick={() => modalConfirmed()}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Приготовлено
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

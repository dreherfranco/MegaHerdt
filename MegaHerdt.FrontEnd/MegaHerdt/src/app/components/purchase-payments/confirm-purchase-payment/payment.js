setTimeout(function() {
    console.log('DOMContentLoaded event fired');
    
    // MUESTRO EL MONTO DEL CARRITO
    console.log(window.amount);
    console.log(window.purchaseArticles);

    
    const mp = new MercadoPago('TEST-a14e30b8-57d4-45a9-9907-6e1f31a8cfe7', {
      locale: 'es-AR'
    });

    const bricksBuilder = mp.bricks();
    const renderCardPaymentBrick = async (bricksBuilder) => {
      const settings = {
        initialization: {
          // PROBAR SACAR EL MONTO DINAMICAMENTE DEL TOTAL DEL CARRITO
          amount: window.amount, // monto a ser pago
          payer: {
            // EMAIL PARA HACER LAS PRUEBAS EN MERCADO PAGO
            // AGREGAR OTROS EMAILS PARA HACER MAS PRUEBAS
            email: "",
          },
        },
        customization: {
          visual: {
            style: {
              theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
            }
          },
          paymentMethods: {
            maxInstallments: 12,
          }
        },
        callbacks: {
          onReady: () => {
            // callback llamado cuando Brick esté listo
          },
          onSubmit: (cardFormData) => {
            // ENVIO LOS DATOS DE LOS ARTICULOS QUE SE VAN A COMPRAR
            cardFormData.purchaseArticles = window.purchaseArticles;
            cardFormData.clientEmail = window.identity.email;
            cardFormData.clientId = window.identity.id;

            //  callback llamado cuando el usuario haga clic en el botón enviar los datos
            //  ejemplo de envío de los datos recolectados por el Brick a su servidor
            return new Promise((resolve, reject) => {

              // LE PASO COMO PARAMETRO LA URL DEL BACKEND A LA CUAL DEBE IR A EFECTUAR EL PAGO.
              fetch(window.apiConfirmPaymentUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cardFormData)
              })
                .then((response) => {
                  console.log(response);
                  
                  //Si la response es existosa
                  if(response.status >= 200 && response.status <= 300){
                    //REDIRIGE AL COMPONENTE purchase-success.component
                    window.location.href = window.paymentSuccessRedirect;
                  }
                  // En caso de error
                  else
                  {
                    //REDIRIGE AL COMPONENTE purchase-failed.component
                    window.location.href = window.paymentFailedRedirect;
                  }

                  // recibir el resultado del pago
                  resolve();
                })
                .catch((error) => {
                  console.log(error);
                  // tratar respuesta de error al intentar crear el pago
                  reject();
                })
            });
          },
          onError: (error) => {
            // callback llamado para todos los casos de error de Brick
            console.log(error);
          },
        },
      };
      window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    };
    renderCardPaymentBrick(bricksBuilder);
  }, 1000);
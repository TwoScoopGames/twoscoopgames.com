
$(window).load(function() {
    $('.flex-direction-nav').remove();
    $('.loader').fadeOut();
    $('[id^=slider]').fadeIn();
    $('[id^=carousel]').fadeIn();
});


$(document).ready(function(){
var js_debug = true;


var activeOffering = 0;
$('#currentOffering').val(activeOffering);
$('#currentOfferingID').val(getActiveOfferingProductID());

function getActiveOfferingProductID(){
    return $('.btnOffering.disabled').data("select-offering-id");
}

function swapZoneSwap(){
  $('.swapZone[data-offering!='+ activeOffering +']').hide();
  $('.swapZone[data-offering='+ activeOffering +']').show();
}

swapZoneSwap();



        $(document).on('click', '.btnOffering.enabled',function(e) {
            var selectedOffering = $(this).data("select-offering");
            var selectedOfferingID = $(this).data("select-offering-id");
            $('#currentOfferingID').val(selectedOfferingID);
            if(js_debug){console.log("you clicked: ", selectedOffering);}
            activeOffering = selectedOffering;
            swapZoneSwap();
            putCurrentSizeInfoInInputs();
            putCurrentColorIDIntoInputs();
            $('.btnOffering').addClass('enabled').removeClass('disabled');
            $(this).addClass('disabled');
            $('#currentOffering').val(activeOffering);
        });






     /* size picker */
    function hasSizes(){
        return $(".sizePicker[data-offering='"+ activeOffering +"']").length > 0;
    }



 var origPrice = $(".price[data-offering='"+ activeOffering +"']").text().replace(/[^0-9.-]/g, "");

    function updatePrice(){
        if(js_debug){ console.log("orig price as float: ", parseFloat(origPrice));
                      console.log("price fee: ", $('#sizeFee').val());
                      console.log("price fee as float: ", parseFloat($('#sizeFee').val())); }
        newPrice = parseFloat(origPrice) + parseFloat($('#sizeFee').val()); 
        $('#price').val(newPrice);
        $('.price[data-offering="'+ activeOffering +'"]').text(newPrice).currency();
    }

putCurrentColorIDIntoInputs();
putCurrentSizeInfoInInputs();

function swapListItemsForward(list){
  var firstItem = list.children('li:first-child');
  list.children('li').hide();
  firstItem.remove();
  list.append(firstItem);
  list.children('li:first-child').show();
}
function swapListItemsBackward(list){
  var lastItem = list.children('li:last-child');
   list.children('li').hide();
  lastItem.remove();
  list.prepend(lastItem);
  list.children('li:first-child').show();
}

$('.sizeRight.arrow').click(function(){
  swapListItemsForward($('.sizePicker ul[data-offering='+ activeOffering +']'));
  putCurrentSizeInfoInInputs();
});
$('.sizeLeft.arrow').click(function(){
  swapListItemsBackward($('.sizePicker ul[data-offering='+ activeOffering +']'));
  putCurrentSizeInfoInInputs();
});

function putCurrentSizeInfoInInputs(){
  var currentSize = $('.sizePicker ul[data-offering='+ activeOffering +'] li:first-child');
  $('#size').val(currentSize.data('value'));
  $('#sizeFee').val(currentSize.data('size-fee'));
  $('#sizeName').val(currentSize.text());
  updatePrice();
}

/* size picker */



function putCurrentColorIDIntoInputs(){
    if(js_debug){ console.log("active offering: ", activeOffering); }
    var index = $('#slider'+ activeOffering +' li.flex-active-slide').index() + 1;
    if(js_debug){ console.log("active offering color index: ", index); }
    if(index == 0){
        var colorID = $('#carousel'+ activeOffering +'  ul li:nth-child(1) img').data("color-id");
    }else{
        var colorID = $('#carousel'+ activeOffering +'  ul li:nth-child(' + index +') img').data("color-id");
    }
    
        if(js_debug){ console.log("active offering color ID: ", colorID); }
    $('#color').val(colorID);
}


$(document).on('click', '[id^=carousel]',function(e) {
    if(js_debug){ console.log('color click'); }
    putCurrentColorIDIntoInputs();
 });


/* tools */
function dollarsToCents(string){
    return string.replace('.','').replace('$', '');
}















/* stripe */

function getSaleDetails(){
    var saleObject = new Object();
        saleObject.campaignName = $('#campaignName').val();
        saleObject.price = dollarsToCents($('#price').text());
        saleObject.productName = $('.headerTitle .swapZone[data-offering!='+ activeOffering +']').text();
        saleObject.selectedColor = $('#color').val();
        saleObject.selectedSize = $('#size').val();
        saleObject.productId = $("#currentOfferingID").val();
 return saleObject;
}
    var publicKey = $('#stripeKey').val();

    var handler = StripeCheckout.configure({
        key: publicKey,
        image: '/cpbash/img/stripe.png',
        token: function(token, args) {
            var sale = getSaleDetails();
            if(js_debug){ console.log("token " , token);
                          console.log("args " , args); }

           
             //var form = $('<form action="/bash/local-confirm.php" method="post">' //debug
               var form = $('<form action="/cpbash/confirm/" method="post">' 
                        // info from token
                        +'<input type="text" name="email" value="'+ token.email +'" />' 
                        +'<input type="text" name="token" value="'+ token.id +'" />' 

                        //info from args
                        +'<input type="text" name="shippingName" value="'+ args.shipping_name +'" />' 
                        +'<input type="text" name="shippingAddressLine1" value="'+ args.shipping_address_line1 +'" />' 
                        +'<input type="text" name="shippingAddressLine2" value="'+ args.shipping_address_line2 +'" />' 
                        +'<input type="text" name="shippingCity" value="'+ args.shipping_address_city +'" />' 
                        +'<input type="text" name="shippingState" value="'+ args.shipping_address_state +'" />' 
                        +'<input type="text" name="shippingCountryCodeISOAlpha2" value="US" />' // Hard-Coded!
                        +'<input type="text" name="shippingPostalCode" value="'+ args.shipping_address_zip +'" />' 
                        +'<input type="text" name="shippingPhoneNo" value="'+ args.shippingPhoneNo +'" />'

                        //product info
                        +'<input type="text" name="productId" value="'+ sale.productId +'" />' 
                        +'<input type="text" name="sizeId" value="'+ sale.selectedSize +'" />' 
                        +'<input type="text" name="colorId" value="'+ sale.selectedColor +'" />' 
                        +'<input type="text" name="units" value="1" />' // Hard-Coded!

                        //extra info
                        +'<input type="text" name="price" value="'+ sale.price +'" />' 
                        +'<input type="text" name="campaignName" value="'+ sale.campaignName +'" />' 
                        +'<input type="text" name="productName" value="'+ sale.productName +'" />' 

                        +'</form>');
            $('body').append(form);
            $(form).submit();
        }
    });

document.getElementById('btnStripe').addEventListener('click', function(e) {
        var sale = getSaleDetails();
        handler.open({
            name: 'CafePress Bash',
            description: sale.productName
            + " size:" + sale.selectedSize,
            amount: sale.price,
            billingAddress: true,
            shippingAddress: true,
        });
       // e.preventDefault();
    });

/* stripe */





/* countdown timer */

var utcSeconds = $(".timeLeft").data("epoch");
var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
var dateEnd = moment(date.setUTCSeconds(utcSeconds)).format('MMMM D, YYYY h:mm:ss');

$(".test").text(dateEnd);

 

 $(function() {
    $('.timeLeft').countdown({
        date: dateEnd
    });
});
 /* end countdown timer */





 


/* pinata  */
var pinata = $(".pinata");
var buffer = 5;
function handleOrientation(event) {
    var y = event.gamma;
    if (y >  60) { y =  60;}
    if (y < -60) { y = -60;}
    pinata.css("-webkit-transform","rotate("+-y/buffer+"deg)");
}

window.addEventListener("deviceorientation", handleOrientation);

/* end pinata  */




   




        /* visibility */
        if(hasSizes()){
            $(".size.module").removeClass('hidden');
        }
        $(".priceTag").appendTo('#slider');

        // var campaignType = $('.campaign.module').data("campaign-type");
        // if (campaignType === "threshold"){
        //     $('.campaign.module').removeClass('hidden');
        // }
        // if (campaignType === "passthrough"){
        //     $('#passthrough').removeClass('hidden');
        // }
        /* visibility */

        /* buy button */

        function makeBuyURL(){
            var productId =$('#btnBuy').data("id");
            var buyURL =  $('#btnBuy').data("url");
            var keepShopping =  $('#btnBuy').data("keepshopping");
            var index = $('.flex-active-slide').index() + 1;
            var selectedColor = $('#carousel ul li:nth-child(' + index +') img').data("color-id");
            var selectedSize = $('#ddlSize').find(":selected").val();

            if(selectedColor > 0){
                buyURL += "&color_" + productId + "=" + selectedColor;
            }else{
                buyURL += "&color_" + productId + "=0" ;
            }
            if(selectedSize > 0){
                buyURL = buyURL + "&size_" + productId + "=" + selectedSize;
            }else{
                buyURL = buyURL + "&size_" + productId + "=0" ;
            }
            buyURL = buyURL + keepShopping;
            return buyURL;
        }

        $('#btnBuy').click(function(){
            window.open(makeBuyURL()); return false;
        });
        /* buy button */




    });



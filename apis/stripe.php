<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

/**
** Documentation
** url: https://stripe.com/docs/api/php
**/

function stripe_create_token($api_key, $card) {
    \Stripe\Stripe::setApiKey($api_key);

    try {
      $token = \Stripe\Token::create([
        "card" => [
        "number" => $card['number'],
        "exp_month" => $card['exp_month'],
        "exp_year" => $card['exp_year'],
        "cvc" => $card['cvc']
        ]
      ]);

      return $token;
    } catch(Exception $e) {
      return $e;
    }
}

function stripe_token() {
  $card = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = stripe_create_token( $apiKey, $card);
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_token', 'stripe_token' );
add_action( 'wp_ajax_stripe_token', 'stripe_token' );

function stripe_create_customer($api_key, $customer) {
  \Stripe\Stripe::setApiKey($api_key);

    try {
      $customer = \Stripe\Customer::create(array(
      "description" => 'charge for '. $customer['email'],
      "email" => $customer['email'],
      "source" => $customer['stripe_token']
    ));

    return $customer;

  } catch(Exception $e) {
    return $e->getMessage();
  }

}

function stripe_create_charge($api_key, $charge) {
  \Stripe\Stripe::setApiKey($api_key);

  try {
    $charge = \Stripe\Charge::create(array(
      "amount" => $charge['amount'] . '00',
      "currency" => $charge['currency'],
      "customer" => $charge['customer'],
      "description" => 'charge for '. $charge['email']
    ));
  } catch(Exception $e) {
    return $e;
  }

  return $charge;
}

function stripe_get_plan($api_key, $name) {
  \Stripe\Stripe::setApiKey($api_key);

   try {
    $plan = \Stripe\Plan::retrieve($name);
    return $plan;
   } catch(Exception $e) {
     return '';
   }
}

function get_plan() {
  $card = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = stripe_get_plan($apiKey, 'donation-2');
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_get_plan', 'get_plan' );
add_action( 'wp_ajax_stripe_get_plan', 'get_plan' );

//fix currency with add prefix
function stripe_create_plan($api_key, $plan) {
  \Stripe\Stripe::setApiKey($api_key);

  $plan = \Stripe\Plan::create(array(
    "amount" => $plan['amount'] . '00',
    "interval" => "month",
    "name" => $plan['plan_name'],
    "currency" => 'usd',
    "id" => $plan['plan_name'])
  );

  return $plan;
}

function stripe_update_plan($api_key, $plan) {
    \Stripe\Stripe::setApiKey($api_key);

    try {
      $p = \Stripe\Plan::retrieve($plan);
      $p->currency = "usd";
      $p->save();

      return $plan;
    } catch(Exception $e) {
      return $e;
    }

}

function stripe_create_subscription($api_key, $charge) {
  \Stripe\Stripe::setApiKey($api_key);

  try {
    $subscription = \Stripe\Subscription::create(array(
      "customer" => $charge["customer"], //"cus_9MzzzON1VtZiKY",
      "plan" => $charge["plan"], //"donation-55"
      "trial_period_days" => $charge["trial_period_days"]
    ));

    return $subscription;

  } catch(Exception $e) {
    return $e;
  }

}

function get_plan_name($amount) {
  return 'donation-' . $amount .'-usd';
}

function stripe_once($api_key, $data) {
  $customer = stripe_create_customer($api_key, $data);
  $data['customer'] = $customer->id;
  return stripe_create_charge($api_key, $data);
}

function stripe_monthly($api_key, $data) {
  $plan_name = get_plan_name($data['amount']);
  $data['plan_name'] = $plan_name;
  $plan = '';

  if(!empty(stripe_get_plan($api_key, $plan_name))) {
    $plan = stripe_get_plan($api_key, $plan_name);
  } else {
    $plan = stripe_create_plan($api_key, $data);
  }

  $customer = stripe_create_customer($api_key, $data);

  $subscription = array();
  $subscription['customer'] = $customer->id;
  $subscription['plan'] = $plan->id;
  $subscription['trial_period_days'] = isset($data['trial_period_days']) ? $data['trial_period_days'] : null;

  return stripe_create_subscription($api_key, $subscription);
}

function stripe_charge() {
  $data = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = array([ 'err' => 'donation_type fail']);

  if($data['donation_type'] == 'monthly') {
    $res = stripe_monthly($apiKey, $data);
  }

  if($data['donation_type'] == 'once') {
    $res = stripe_once($apiKey, $data);
  }

  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_charge', 'stripe_charge' );
add_action( 'wp_ajax_stripe_charge', 'stripe_charge' );

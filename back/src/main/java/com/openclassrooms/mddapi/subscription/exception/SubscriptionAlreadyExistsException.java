package com.openclassrooms.mddapi.subscription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class SubscriptionAlreadyExistsException extends RuntimeException {

}

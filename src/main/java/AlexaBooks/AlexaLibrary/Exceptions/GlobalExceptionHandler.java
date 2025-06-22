package AlexaBooks.AlexaLibrary.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
    );

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Validation failed");
    response.put("errors", errors);

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }


  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleNotFound(ResourceNotFoundException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("message", ex.getMessage());

    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }


  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<Map<String, String>> handleResponseStatusException(ResponseStatusException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("message", ex.getReason());

    return new ResponseEntity<>(response, ex.getStatusCode());
  }


  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGeneric(Exception ex) {
    Map<String, String> response = new HashMap<>();
    response.put("message", "An internal error occurred");
    response.put("error", ex.getMessage());

    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

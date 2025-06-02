package AlexaBooks.AlexaLibrary.Exceptions;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String message){
        super(message);
    }
}

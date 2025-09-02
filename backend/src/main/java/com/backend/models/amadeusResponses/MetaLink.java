package com.backend.models.amadeusResponses;

public class MetaLink {
    private String self;
    private String next;
    private String previous;
    private String last;
    private String first;
    private String up;

    public String getSelf() { return self; }
    public void setSelf(String self) { this.self = self; }

    public String getNext() { return next; }
    public void setNext(String next) { this.next = next; }

    public String getPrevious() { return previous; }
    public void setPrevious(String previous) { this.previous = previous; }

    public String getLast() { return last; }
    public void setLast(String last) { this.last = last; }

    public String getFirst() { return first; }
    public void setFirst(String first) { this.first = first; }

    public String getUp() { return up; }
    public void setUp(String up) { this.up = up; }
}

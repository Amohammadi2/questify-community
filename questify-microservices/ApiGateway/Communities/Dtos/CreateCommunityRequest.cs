﻿namespace ApiGateway.Communities.Dtos
{
    public class CreateCommunityRequest
    {
        public string Name { get; set; }
        public string Descriptiion { get; set; }
        public bool IsPrivate { get; set; }
    }
}

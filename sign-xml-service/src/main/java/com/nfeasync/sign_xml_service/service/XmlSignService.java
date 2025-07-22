package com.nfeasync.sign_xml_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.nfeasync.sign_xml_service.signer.XmlSigner;
import com.nfeasync.sign_xml_service.utils.XmlUtils;

@Service
@RequiredArgsConstructor
public class XmlSignService {
    private final XmlSigner xmlSigner;
    public String signXml(String xmlInput) throws Exception {
        Document document = XmlUtils.parseXml(xmlInput);
        Document signedDocument = xmlSigner.sign(document);
        return XmlUtils.toString(signedDocument);
    }
}
